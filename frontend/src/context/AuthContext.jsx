// Archivo: client/src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      setUsuario(response.data);
    } catch (error) {
      console.error('Error cargando usuario:', error);
      localStorage.removeItem('token');
    } finally {
      setCargando(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      
      const { token, usuario: usuarioData } = response.data;
      
      localStorage.setItem('token', token);
      setUsuario(usuarioData);
      
      return { success: true };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al iniciar sesión';
      setError(mensaje);
      return { success: false, error: mensaje };
    }
  };

  const register = async (datos) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', datos);
      
      const { token, usuario: usuarioData } = response.data;
      
      localStorage.setItem('token', token);
      setUsuario(usuarioData);
      
      return { success: true };
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al registrarse';
      setError(mensaje);
      return { success: false, error: mensaje };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  const value = {
    usuario,
    cargando,
    error,
    login,
    register,
    logout,
    cargarUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};