// Archivo: client/src/components/Dashboard/DashboardDocente.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import RegistroAsistencia from '../Registros/RegistroAsistencia';
import FormularioAusencia from '../Ausencias/FormularioAusencias';
import ListaNotificaciones from '../Notificaciones/ListaNotificaciones';
import './Dashboard.css';

function DashboardDocente() {
  const { usuario, logout } = useAuth();
  const [vistaActual, setVistaActual] = useState('inicio');
  const [institutos, setInstitutos] = useState([]);
  const [registrosHoy, setRegistrosHoy] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [institutosRes, registrosRes, ausenciasRes] = await Promise.all([
        api.get('/users/institutos'),
        api.get('/registros/hoy'),
        api.get('/ausencias')
      ]);

      setInstitutos(institutosRes.data);
      setRegistrosHoy(registrosRes.data);
      setAusencias(ausenciasRes.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case 'registros':
        return <RegistroAsistencia institutos={institutos} onRegistroCreado={cargarDatos} />;
      case 'ausencias':
        return <FormularioAusencia institutos={institutos} onAusenciaCreada={cargarDatos} />;
      case 'notificaciones':
        return <ListaNotificaciones />;
      default:
        return (
          <div className="inicio-content">
            <h2>Bienvenido, {usuario?.nombre}</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{institutos.length}</h3>
                <p>Institutos Asignados</p>
              </div>
              <div className="stat-card">
                <h3>{registrosHoy.length}</h3>
                <p>Registros Hoy</p>
              </div>
              <div className="stat-card">
                <h3>{ausencias.filter(a => a.estado === 'pendiente').length}</h3>
                <p>Ausencias Pendientes</p>
              </div>
            </div>

            <div className="section">
              <h3>Registros de Hoy</h3>
              {registrosHoy.length === 0 ? (
                <p className="empty-message">No hay registros para hoy</p>
              ) : (
                <div className="registros-list">
                  {registrosHoy.map(registro => (
                    <div key={registro._id} className="registro-item">
                      <span className={`badge ${registro.tipo}`}>
                        {registro.tipo === 'entrada' ? '⬇️' : '⬆️'} {registro.tipo.toUpperCase()}
                      </span>
                      <span>{registro.instituto?.nombre}</span>
                      <span>{new Date(registro.fecha).toLocaleTimeString('es-AR')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="section">
              <h3>Ausencias Recientes</h3>
              {ausencias.slice(0, 5).length === 0 ? (
                <p className="empty-message">No hay ausencias registradas</p>
              ) : (
                <div className="ausencias-list">
                  {ausencias.slice(0, 5).map(ausencia => (
                    <div key={ausencia._id} className="ausencia-item">
                      <div>
                        <strong>{ausencia.instituto?.nombre}</strong>
                        <p>{new Date(ausencia.fechaAusencia).toLocaleDateString('es-AR')}</p>
                      </div>
                      <span className={`badge ${ausencia.estado}`}>
                        {ausencia.estado}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>EduCheck</h1>
          <p className="user-info">{usuario?.nombre}</p>
          <span className="badge-rol">Docente</span>
        </div>

        <ul className="menu">
          <li 
            className={vistaActual === 'inicio' ? 'active' : ''}
            onClick={() => setVistaActual('inicio')}
          >
            Inicio
          </li>
          <li 
            className={vistaActual === 'registros' ? 'active' : ''}
            onClick={() => setVistaActual('registros')}
          >
            Registrar Asistencia
          </li>
          <li 
            className={vistaActual === 'ausencias' ? 'active' : ''}
            onClick={() => setVistaActual('ausencias')}
          >
            Reportar Ausencia
          </li>
          <li 
            className={vistaActual === 'notificaciones' ? 'active' : ''}
            onClick={() => setVistaActual('notificaciones')}
          >
            Notificaciones
          </li>
        </ul>

        <button onClick={logout} className="btn btn-logout">
          Cerrar Sesión
        </button>
      </nav>

      <main className="main-content">
        {renderContenido()}
      </main>
    </div>
  );
}

export default DashboardDocente;