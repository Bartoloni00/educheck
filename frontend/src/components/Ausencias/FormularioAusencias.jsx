// Archivo: client/src/components/Ausencias/FormularioAusencia.jsx

import React, { useState } from 'react';
import api from '../../services/api';

function FormularioAusencia({ institutos, onAusenciaCreada }) {
  const [formData, setFormData] = useState({
    institutoId: '',
    fechaAusencia: '',
    motivo: 'personal',
    descripcion: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.institutoId || !formData.fechaAusencia) {
      setMensaje({ texto: 'Completa todos los campos requeridos', tipo: 'error' });
      return;
    }

    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      await api.post('/ausencias', formData);

      setMensaje({ texto: 'Ausencia reportada exitosamente', tipo: 'success' });
      setFormData({
        institutoId: '',
        fechaAusencia: '',
        motivo: 'personal',
        descripcion: ''
      });

      if (onAusenciaCreada) onAusenciaCreada();
    } catch (error) {
      console.error('Error reportando ausencia:', error);
      setMensaje({ 
        texto: error.response?.data?.mensaje || 'Error al reportar ausencia', 
        tipo: 'error' 
      });
    } finally {
      setCargando(false);
    }
  };

  // Obtener fecha mínima (hoy)
  const fechaMinima = new Date().toISOString().split('T')[0];

  return (
    <div className="section">
      <h2>Reportar Ausencia</h2>
      
      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="institutoId">Instituto *</label>
          <select
            id="institutoId"
            name="institutoId"
            value={formData.institutoId}
            onChange={handleChange}
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
          <label htmlFor="fechaAusencia">Fecha de Ausencia *</label>
          <input
            type="date"
            id="fechaAusencia"
            name="fechaAusencia"
            value={formData.fechaAusencia}
            onChange={handleChange}
            min={fechaMinima}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="motivo">Motivo *</label>
          <select
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            required
          >
            <option value="personal">Personal</option>
            <option value="enfermedad">Enfermedad</option>
            <option value="emergencia">Emergencia</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción (opcional)</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            placeholder="Describe brevemente el motivo de tu ausencia..."
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={cargando}
        >
          {cargando ? 'Reportando...' : 'Reportar Ausencia'}
        </button>
      </form>
    </div>
  );
}

export default FormularioAusencia;