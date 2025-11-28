import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import ListaNotificaciones from '../Notificaciones/ListaNotificaciones';
import './Dashboard.css';

function DashboardInstituto() {
  const { usuario, logout } = useAuth();
  const [vistaActual, setVistaActual] = useState('inicio');
  const [docentes, setDocentes] = useState([]);
  const [registrosHoy, setRegistrosHoy] = useState([]);
  const [ausenciasPendientes, setAusenciasPendientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [docentesRes, registrosRes, ausenciasRes] = await Promise.all([
        api.get('/users/docentes'),
        api.get('/registros/hoy'),
        api.get('/ausencias')
      ]);

      setDocentes(docentesRes.data);
      setRegistrosHoy(registrosRes.data);
      setAusenciasPendientes(ausenciasRes.data.filter(a => a.estado === 'pendiente'));
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const manejarAusencia = async (ausenciaId, estado) => {
    try {
      await api.put(`/ausencias/${ausenciaId}`, { 
        estado,
        respuestaInstituto: estado === 'aprobada' ? 'Ausencia aprobada' : 'Ausencia rechazada'
      });
      
      cargarDatos();
      alert(`Ausencia ${estado} correctamente`);
    } catch (error) {
      console.error('Error actualizando ausencia:', error);
      alert('Error al procesar la ausencia');
    }
  };

  const renderContenido = () => {
    switch (vistaActual) {
      case 'docentes':
        return (
          <div className="section">
            <h2>Mis Docentes</h2>
            {docentes.length === 0 ? (
              <p className="empty-message">No hay docentes asignados</p>
            ) : (
              <div className="docentes-grid">
                {docentes.map(docente => (
                  <div key={docente._id} className="card">
                    <h3>{docente.nombre}</h3>
                    <p>📧 {docente.email}</p>
                    <p>📞 {docente.telefono || 'No registrado'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'ausencias':
        return (
          <div className="section">
            <h2>Ausencias Pendientes</h2>
            {ausenciasPendientes.length === 0 ? (
              <p className="empty-message">No hay ausencias pendientes</p>
            ) : (
              <div className="ausencias-grid">
                {ausenciasPendientes.map(ausencia => (
                  <div key={ausencia._id} className="card ausencia-card">
                    <h3>{ausencia.docente?.nombre}</h3>
                    <p><strong>Fecha:</strong> {new Date(ausencia.fechaAusencia).toLocaleDateString('es-AR')}</p>
                    <p><strong>Motivo:</strong> {ausencia.motivo}</p>
                    {ausencia.descripcion && (
                      <p><strong>Descripción:</strong> {ausencia.descripcion}</p>
                    )}
                    <div className="ausencia-actions">
                      <button 
                        className="btn btn-success"
                        onClick={() => manejarAusencia(ausencia._id, 'aprobada')}
                      >
                        Aprobar
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => manejarAusencia(ausencia._id, 'rechazada')}
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'notificaciones':
        return <ListaNotificaciones />;

      default:
        return (
          <div className="inicio-content">
            <h2>Bienvenido, {usuario?.nombre}</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{docentes.length}</h3>
                <p>Docentes Asignados</p>
              </div>
              <div className="stat-card">
                <h3>{registrosHoy.length}</h3>
                <p>Registros Hoy</p>
              </div>
              <div className="stat-card">
                <h3>{ausenciasPendientes.length}</h3>
                <p>Ausencias Pendientes</p>
              </div>
            </div>

            <div className="section">
              <h3>Actividad de Hoy</h3>
              {registrosHoy.length === 0 ? (
                <p className="empty-message">No hay registros para hoy</p>
              ) : (
                <div className="registros-list">
                  {registrosHoy.map(registro => (
                    <div key={registro._id} className="registro-item">
                      <div>
                        <strong>{registro.usuario?.nombre}</strong>
                        <p>{new Date(registro.fecha).toLocaleTimeString('es-AR')}</p>
                      </div>
                      <span className={`badge ${registro.tipo}`}>
                        {registro.tipo === 'entrada' ? '⬇️' : '⬆️'} {registro.tipo.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {ausenciasPendientes.length > 0 && (
              <div className="section alert-section">
                <h3>⚠️ Ausencias Pendientes de Revisión</h3>
                <p>Tienes {ausenciasPendientes.length} ausencia(s) pendiente(s) de revisar.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setVistaActual('ausencias')}
                >
                  Ver Ausencias
                </button>
              </div>
            )}
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
          <span className="badge-rol">Instituto</span>
        </div>

        <ul className="menu">
          <li 
            className={vistaActual === 'inicio' ? 'active' : ''}
            onClick={() => setVistaActual('inicio')}
          >
            🏠 Inicio
          </li>
          <li 
            className={vistaActual === 'docentes' ? 'active' : ''}
            onClick={() => setVistaActual('docentes')}
          >
            👥 Mis Docentes
          </li>
          <li 
            className={vistaActual === 'ausencias' ? 'active' : ''}
            onClick={() => setVistaActual('ausencias')}
          >
            🚫 Ausencias {ausenciasPendientes.length > 0 && (
              <span className="badge-count">{ausenciasPendientes.length}</span>
            )}
          </li>
          <li 
            className={vistaActual === 'notificaciones' ? 'active' : ''}
            onClick={() => setVistaActual('notificaciones')}
          >
            🔔 Notificaciones
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

export default DashboardInstituto;