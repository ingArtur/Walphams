import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../components/Dashboard';
import Clientes from '../pages/Clientes';
import Categorias from '../pages/Categorias';
import Pedidos from '../pages/Pedidos';
import Productos from '../pages/Productos';
import Proveedores from '../pages/Proveedores';
import Ubicaciones from '../pages/Ubicaciones';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <div className="app-container">
      {/* Renderizar el Sidebar solo si el usuario está autenticado y no estamos en la página de inicio de sesión */}
      {currentUser && window.location.pathname !== '/login' && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard/clients" element={<PrivateRoute><Clientes /></PrivateRoute>} />
          <Route path="/dashboard/categories" element={<PrivateRoute><Categorias /></PrivateRoute>} />
          <Route path="/dashboard/orders" element={<PrivateRoute><Pedidos /></PrivateRoute>} />
          <Route path="/dashboard/products" element={<PrivateRoute><Productos /></PrivateRoute>} />
          <Route path="/dashboard/providers" element={<PrivateRoute><Proveedores /></PrivateRoute>} />
          <Route path="/dashboard/locations" element={<PrivateRoute><Ubicaciones /></PrivateRoute>} />
          {/* Ruta por defecto o 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
