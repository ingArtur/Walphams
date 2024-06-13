import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <header className="App-header">
      <h1>
        <span style={{ color: '#32E0E6' }}>WALP</span>
        <span style={{ color: 'white' }}>HAMS</span>
      </h1>
      <nav>
        <Link to="/">Inicio</Link>
        {!currentUser ? (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        ) : (
          <div className="user-info">
            <FaRegCircleUser className="user-icon" />
            <span>{currentUser.name}</span>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
