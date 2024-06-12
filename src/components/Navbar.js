import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
          <span>Bienvenido, {currentUser.email}</span>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
