import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './Register.css'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [compania, setCompania] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      // Crear usuario en Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      
      // Guardar datos adicionales en Firebase Firestore
      await addDoc(collection(db, 'users'), {
        userId: user.uid,
        email,
        nombre,
        apellido,
        ciudad,
        telefono,
        compania
      })
      
      alert('Usuario registrado con éxito')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Registro</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="text"
          placeholder="Compañía"
          value={compania}
          onChange={(e) => setCompania(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default Register