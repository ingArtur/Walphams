import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import './Clientes.css';

// Initialize Firestore
const db = getFirestore();

const Clientes = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [clients, setClients] = useState([]);
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'clients'), snapshot => {
      const clientsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClients(clientsData);
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

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), clientData);
      setClientData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'clients', id));
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="client-form-container">
          <form className="client-form" onSubmit={handleClientSubmit}>
            <h2>Agregar Nuevo Cliente</h2>
            <label>
              Nombre:
              <input type="text" name="name" value={clientData.name} onChange={handleChange} required />
            </label>
            <label>
              Correo Electrónico:
              <input type="email" name="email" value={clientData.email} onChange={handleChange} required />
            </label>
            <label>
              Teléfono:
              <input type="text" name="phone" value={clientData.phone} onChange={handleChange} required />
            </label>
            <label>
              Dirección:
              <input type="text" name="address" value={clientData.address} onChange={handleChange} required />
            </label>
            <button type="submit" className="btn btn-primary">Agregar Cliente</button>
          </form>
        </div>

        <div className="client-table-container">
          <h2>Clientes</h2>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <table className="client-table">
            <thead>
              <tr>
                <th>APELLIDOS Y NOMBRE</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>DIRECCION</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>
                    <button className="btn btn-edit">Editar</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(client.id)}>Eliminar</button>
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

export default Clientes;
