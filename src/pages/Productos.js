import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Sidebar from '../components/Sidebar'; // Ajusta la ruta según tu estructura de directorios
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    stock: '',
    precio: '',
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProductos(productosList);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "productos"), nuevoProducto);
      setNuevoProducto({
        nombre: '',
        stock: '',
        precio: '',
        createdAt: new Date().toISOString()
      });

      // Actualizar la lista de productos después de agregar uno nuevo
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProductos(productosList);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos(productos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="productos-container">
          <h1>Productos</h1>
          <div className="add-product">
            <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChange} placeholder="Nombre" />
            <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleChange} placeholder="Stock" />
            <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} placeholder="Precio" />
            <button onClick={handleAdd}>Agregar Producto</button>
          </div>
          <table className="productos-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Created at</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={producto.id}>
                  <td>{index + 1}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.precio}</td>
                  <td>{new Date(producto.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="btn-edit">✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(producto.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productos;
