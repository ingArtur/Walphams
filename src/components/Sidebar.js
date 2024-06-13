
import { Link } from 'react-router-dom';
import { FaUser, FaBox, FaMapMarkerAlt, FaTags, FaShoppingCart, FaTruck, FaSignOutAlt, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ handleLogout }) => {


  return (
    <div className="sidenav">
      <h1>
        <span style={{ color: '#32E0E6' }}>WALP</span>
        <span style={{ color: 'white' }}>HAMS</span>
      </h1>
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
};

export default Sidebar;
