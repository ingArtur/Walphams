import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Sidebar from '../components/Sidebar';
import './Dashboard.css'; // Asegúrate de crear este archivo de estilo

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
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;