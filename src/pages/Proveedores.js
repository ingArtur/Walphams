import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import './Proveedores.css';

// Inicializar Firestore
const db = getFirestore();

const Proveedores = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [proveedores, setProveedores] = useState([]);
  const [proveedorData, setProveedorData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'proveedores'), snapshot => {
      const proveedoresData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProveedores(proveedoresData);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  const handleProveedorSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'proveedores'), proveedorData);
      setProveedorData({ nombre: '', email: '', telefono: '', direccion: '' });
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorData({
      ...proveedorData,
      [name]: value
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'proveedores', id));
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="proveedor-form-container">
          <form className="proveedor-form" onSubmit={handleProveedorSubmit}>
            <h2>Agregar Nuevo Proveedor</h2>
            <label>
              Nombre:
              <input type="text" name="nombre" value={proveedorData.nombre} onChange={handleChange} required />
            </label>
            <label>
              Correo Electrónico:
              <input type="email" name="email" value={proveedorData.email} onChange={handleChange} required />
            </label>
            <label>
              Teléfono:
              <input type="text" name="telefono" value={proveedorData.telefono} onChange={handleChange} required />
            </label>
            <label>
              Dirección:
              <input type="text" name="direccion" value={proveedorData.direccion} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn-primary">Agregar Proveedor</button>
          </form>
        </div>

        <div className="proveedor-table-container">
          <h2>Proveedores</h2>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <table className="proveedor-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedores.map(proveedor => (
                <tr key={proveedor.id}>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.email}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.direccion}</td>
                  <td>
                    <button className="btn btn-edit">Editar</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(proveedor.id)}>Eliminar</button>
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

export default Proveedores;
