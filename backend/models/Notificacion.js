const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  emisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  receptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['mensaje', 'ausencia', 'registro', 'sistema'],
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  leida: {
    type: Boolean,
    default: false
  },
  fechaLeida: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Notificacion', notificacionSchema);