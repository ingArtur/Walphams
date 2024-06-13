import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Sidebar from '../components/Sidebar'; // Ajusta la ruta según tu estructura de directorios
import './Categorias.css';

const CategoriasProductos = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imageUrl: '',
    createdAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "categorias"));
      const categoriasList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCategorias(categoriasList);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "categorias"), nuevaCategoria);
      setNuevaCategoria({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imageUrl: '',
        createdAt: new Date().toISOString()
      });
      fetchCategorias(); // Actualizar la lista de categorías después de agregar una nueva
    } catch (error) {
      console.error("Error adding categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "categorias", id));
      setCategorias(categorias.filter(categoria => categoria.id !== id));
    } catch (error) {
      console.error("Error deleting categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar handleLogout={() => { /* Implementa la lógica de logout si es necesario */ }} />
      <div className="main-content">
        <div className="categorias-container">
          <h1 className="categorias-title">Categorías de Productos</h1>
          <div className="add-categoria">
            <input type="text" className="input-field" name="nombre" value={nuevaCategoria.nombre} onChange={handleChange} placeholder="Nombre de Categoría" />
            <textarea className="input-field" name="descripcion" value={nuevaCategoria.descripcion} onChange={handleChange} placeholder="Descripción" />
            <input type="number" className="input-field" name="precio" value={nuevaCategoria.precio} onChange={handleChange} placeholder="Precio" />
            <input type="number" className="input-field" name="stock" value={nuevaCategoria.stock} onChange={handleChange} placeholder="Stock" />
            <input type="text" className="input-field" name="imageUrl" value={nuevaCategoria.imageUrl} onChange={handleChange} placeholder="URL de Imagen" />
            <button className="btn-add" onClick={handleAdd} disabled={loading}>Agregar Categoría</button>
          </div>
          <table className="categorias-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8">Cargando...</td></tr>
              ) : (
                categorias.map((categoria, index) => (
                  <tr key={categoria.id}>
                    <td>{index + 1}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td>{categoria.precio}</td>
                    <td>{categoria.stock}</td>
                    <td>{categoria.imageUrl}</td>
                    <td>{new Date(categoria.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn-edit">Editar</button>
                      <button className="btn-delete" onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriasProductos;
