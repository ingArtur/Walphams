import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Obtiene el historial de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Redirige al usuario al Dashboard después de iniciar sesión
      navigate('/dashboard', {replace:true});
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className="form">
  <div className="input-group">
    <input
      type="email"
      placeholder="Correo electrónico"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="input-field"
    />
    <FontAwesomeIcon icon={faEnvelope} className="icon" />
  </div>
  <div className="input-group">
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="input-field"
    />
    <FontAwesomeIcon icon={faLock} className="icon" />
  </div>
  <button type="submit" className="submit-button">Iniciar Sesión</button>
</form>

    </div>
  );
};

export default Login;