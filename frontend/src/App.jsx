// Archivo: client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardDocente from './components/Dashboard/DashboardDocente';
import DashboardInstituto from './components/Dashboard/DashboardInstituto';
import './App.css';

// Componente para rutas protegidas
const RutaProtegida = ({ children, rolRequerido }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const { usuario } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route 
        path="/login" 
        element={usuario ? <Navigate to="/" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={usuario ? <Navigate to="/" /> : <Register />} 
      />

      {/* Ruta principal - redirige según rol */}
      <Route 
        path="/" 
        element={
          <RutaProtegida>
            {usuario?.rol === 'docente' ? (
              <DashboardDocente />
            ) : usuario?.rol === 'instituto' ? (
              <DashboardInstituto />
            ) : (
              <Navigate to="/login" />
            )}
          </RutaProtegida>
        } 
      />

      {/* Rutas específicas por rol */}
      <Route 
        path="/dashboard-docente" 
        element={
          <RutaProtegida rolRequerido="docente">
            <DashboardDocente />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard-instituto" 
        element={
          <RutaProtegida rolRequerido="instituto">
            <DashboardInstituto />
          </RutaProtegida>
        } 
      />

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>

  );
}

export default App;