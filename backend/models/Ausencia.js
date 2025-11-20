// Archivo: server/models/Ausencia.js

const mongoose = require('mongoose');

const ausenciaSchema = new mongoose.Schema({
  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  instituto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaAusencia: {
    type: Date,
    required: true
  },
  motivo: {
    type: String,
    required: true,
    enum: ['enfermedad', 'personal', 'emergencia', 'otro']
  },
  descripcion: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobada', 'rechazada'],
    default: 'pendiente'
  },
  respuestaInstituto: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ausencia', ausenciaSchema);