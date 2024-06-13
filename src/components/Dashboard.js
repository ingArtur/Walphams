import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUsers, faTruck, faTags, faBox, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';  // Importa el archivo CSS

const Dashboard = () => {
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
    <div className="dashboard-container">
      <Sidebar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="responsive-tiles">
          <div className="tile">
            <FontAwesomeIcon icon={faUserShield} className="tile-icon" />
            <span className="tile-count">2</span>
            <span className="tile-label">Administrador</span>
          </div>
          <div className="tile">
            <FontAwesomeIcon icon={faUsers} className="tile-icon" />
            <span className="tile-count">71</span>
            <span className="tile-label">Clientes</span>
          </div>
          <div className="tile">
            <FontAwesomeIcon icon={faTruck} className="tile-icon" />
            <span className="tile-count">7</span>
            <span className="tile-label">Proveedores</span>
          </div>
          <div className="tile">
            <FontAwesomeIcon icon={faTags} className="tile-icon" />
            <span className="tile-count">9</span>
            <span className="tile-label">Categorias</span>
          </div>
          <div className="tile">
            <FontAwesomeIcon icon={faBox} className="tile-icon" />
            <span className="tile-count">121</span>
            <span className="tile-label">Productos</span>
          </div>
          <div className="tile">
            <FontAwesomeIcon icon={faShoppingCart} className="tile-icon" />
            <span className="tile-count">47</span>
            <span className="tile-label">Pedidos</span>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
