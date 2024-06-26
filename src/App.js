import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>
              <span style={{ color: '#32E0E6' }}>WALP</span>
              <span style={{ color: 'white' }}>HAMS</span>
            </h1>
            <nav>
              <Link to="/">Inicio</Link>
              <AuthLinks />
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              {/* <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" replace={true} />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

const AuthLinks = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {!currentUser ? (
        <>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      ) : (
        <span>Bienvenido, {currentUser.email}</span>
      )}
    </>
  );
}

export default App;





