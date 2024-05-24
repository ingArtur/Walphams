import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBox, FaMapMarkerAlt, FaTags, FaShoppingCart, FaTruck, FaSignOutAlt, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import './Dashboard.css';

function Dashboard() {
  const [isClientsSubmenuOpen, setIsClientsSubmenuOpen] = useState(false);
  const [isProductsSubmenuOpen, setIsProductsSubmenuOpen] = useState(false);
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

  const toggleClientsSubmenu = () => {
    setIsClientsSubmenuOpen(!isClientsSubmenuOpen);
  };

  const toggleProductsSubmenu = () => {
    setIsProductsSubmenuOpen(!isProductsSubmenuOpen);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <div className="menu-item" onClick={toggleClientsSubmenu}>
              <FaUser /> Clientes {isClientsSubmenuOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isClientsSubmenuOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/dashboard/clients/list">Lista de Clientes</Link>
                </li>
                <li>
                  <Link to="/dashboard/clients/add">Agregar Cliente</Link>
                </li>
                <li>
                  <Link to="/dashboard/clients/import">Importar Clientes</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="menu-item" onClick={toggleProductsSubmenu}>
              <FaBox /> Productos {isProductsSubmenuOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isProductsSubmenuOpen && (
              <ul className="submenu">
                <li>
                  <Link to="/dashboard/products/list">Lista de Productos</Link>
                </li>
                <li>
                  <Link to="/dashboard/products/add">Agregar Producto</Link>
                </li>
                <li>
                  <Link to="/dashboard/products/delete">Eliminar Producto</Link>
                </li>
              </ul>
            )}
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

