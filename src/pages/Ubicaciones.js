import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './Ubicaciones.css';

const Ubicaciones = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [nuevaUbicacion, setNuevaUbicacion] = useState({
    nombre: '',
    capacidad: '',
    descripcion: '',
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ubicaciones"));
        const ubicacionesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUbicaciones(ubicacionesList);
      } catch (error) {
        console.error("Error fetching ubicaciones:", error);
      }
    };

    fetchUbicaciones();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaUbicacion({ ...nuevaUbicacion, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "ubicaciones"), nuevaUbicacion);
      setNuevaUbicacion({
        nombre: '',
        capacidad: '',
        descripcion: '',
        createdAt: new Date().toISOString()
      });

      // Actualizar la lista de ubicaciones después de agregar una nueva
      const querySnapshot = await getDocs(collection(db, "ubicaciones"));
      const ubicacionesList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUbicaciones(ubicacionesList);
    } catch (error) {
      console.error("Error adding ubicacion:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ubicaciones", id));
      setUbicaciones(ubicaciones.filter(ubicacion => ubicacion.id !== id));
    } catch (error) {
      console.error("Error deleting ubicacion:", error);
    }
  };

  return (
    <div className="ubicaciones-container">
      <h1 className="ubicaciones-title">Ubicaciones de Bodega</h1>
      <div className="add-ubicacion">
        <input type="text" className="input-field" name="nombre" value={nuevaUbicacion.nombre} onChange={handleChange} placeholder="Nombre de Ubicación" />
        <input type="number" className="input-field" name="capacidad" value={nuevaUbicacion.capacidad} onChange={handleChange} placeholder="Capacidad" />
        <textarea className="input-field" name="descripcion" value={nuevaUbicacion.descripcion} onChange={handleChange} placeholder="Descripción" />
        <button className="btn-add" onClick={handleAdd}>Agregar Ubicación</button>
      </div>
      <table className="ubicaciones-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Descripción</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ubicaciones.map((ubicacion, index) => (
            <tr key={ubicacion.id}>
              <td>{index + 1}</td>
              <td>{ubicacion.nombre}</td>
              <td>{ubicacion.capacidad}</td>
              <td>{ubicacion.descripcion}</td>
              <td>{new Date(ubicacion.createdAt).toLocaleString()}</td>
              <td>
                <button className="btn-edit">Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(ubicacion.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ubicaciones;