import { useState, useEffect } from 'react';
import api from '../../services/api';

function ListaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const cargarNotificaciones = async () => {
    try {
      const response = await api.get('/notificaciones');
      setNotificaciones(response.data.notificaciones);
      setNoLeidas(response.data.noLeidas);
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoLeida = async (id) => {
    try {
      await api.put(`/notificaciones/${id}/leer`);
      cargarNotificaciones();
    } catch (error) {
      console.error('Error marcando notificación:', error);
    }
  };

  const marcarTodasLeidas = async () => {
    try {
      await api.put('/notificaciones/leer-todas');
      cargarNotificaciones();
    } catch (error) {
      console.error('Error marcando notificaciones:', error);
    }
  };

  if (cargando) {
    return <div className="section"><p>Cargando notificaciones...</p></div>;
  }

  return (
    <div className="section">
      <div className="section-header">
        <h2>Notificaciones</h2>
        {noLeidas > 0 && (
          <button 
            onClick={marcarTodasLeidas}
            className="btn btn-secondary"
          >
            Marcar todas como leídas ({noLeidas})
          </button>
        )}
      </div>

      {notificaciones.length === 0 ? (
        <p className="empty-message">No tienes notificaciones</p>
      ) : (
        <div className="notificaciones-list">
          {notificaciones.map(notif => (
            <div 
              key={notif._id} 
              className={`notificacion-item ${!notif.leida ? 'no-leida' : ''}`}
              onClick={() => !notif.leida && marcarComoLeida(notif._id)}
            >
              <div className="notif-header">
                <h4>{notif.titulo}</h4>
                <span className="notif-fecha">
                  {new Date(notif.createdAt).toLocaleDateString('es-AR')}
                </span>
              </div>
              <p>{notif.mensaje}</p>
              <small>De: {notif.emisor?.nombre}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaNotificaciones;