// routes/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../components/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/" element={<PrivateRoute><Navigate to="/dashboard" /></PrivateRoute>} />
    </Routes>
  );
}

export default AppRoutes;
