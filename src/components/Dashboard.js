import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBox, FaMapMarkerAlt, FaTags, FaShoppingCart, FaTruck, FaSignOutAlt } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/clients">
              <FaUser /> Clientes
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products">
              <FaBox /> Productos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/locations">
              <FaMapMarkerAlt /> Ubicaciones
            </Link>
          </li>
          <li>
            <Link to="/dashboard/categories">
              <FaTags /> Categorías
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders">
              <FaShoppingCart /> Pedidos
            </Link>
          </li>
          <li>
            <Link to="/dashboard/providers">
              <FaTruck /> Proveedores
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt /> Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;


