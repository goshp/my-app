// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check for auth token in localStorage
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
