// Archivo: client/src/components/Registros/RegistroAsistencia.jsx

import React, { useState } from 'react';
import api from '../../services/api';

function RegistroAsistencia({ institutos, onRegistroCreado }) {
  const [institutoSeleccionado, setInstitutoSeleccionado] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [notas, setNotas] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!institutoSeleccionado) {
      setMensaje({ texto: 'Selecciona un instituto', tipo: 'error' });
      return;
    }

    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      await api.post('/api/registros', {
        institutoId: institutoSeleccionado,
        tipo,
        notas
      });

      setMensaje({
        texto: `${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada exitosamente`,
        tipo: 'success'
      });

      setNotas('');
      if (onRegistroCreado) onRegistroCreado();
    } catch (error) {
      console.error('Error registrando asistencia:', error);
      setMensaje({
        texto: error.response?.data?.mensaje || 'Error al registrar asistencia',
        tipo: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="section">
      <h2>Registrar Asistencia</h2>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="instituto">Instituto</label>
          <select
            id="instituto"
            value={institutoSeleccionado}
            onChange={(e) => setInstitutoSeleccionado(e.target.value)}
            required
          >
            <option value="">Selecciona un instituto</option>
            {institutos.map(instituto => (
              <option key={instituto._id} value={instituto._id}>
                {instituto.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de Registro</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="entrada"
                checked={tipo === 'entrada'}
                onChange={(e) => setTipo(e.target.value)}
              />
              <span>⬇️ Entrada</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="salida"
                checked={tipo === 'salida'}
                onChange={(e) => setTipo(e.target.value)}
              />
              <span>⬆️ Salida</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notas">Notas (opcional)</label>
          <textarea
            id="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows="3"
            placeholder="Agrega alguna nota si es necesario..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={cargando}
        >
          {cargando ? 'Registrando...' : `Registrar ${tipo === 'entrada' ? 'Entrada' : 'Salida'}`}
        </button>
      </form>
    </div>
  );
}

export default RegistroAsistencia;
