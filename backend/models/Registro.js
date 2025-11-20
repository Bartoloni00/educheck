// Archivo: server/models/Registro.js

const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  instituto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['entrada', 'salida'],
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  ubicacion: {
    latitud: Number,
    longitud: Number
  },
  notas: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Registro', registroSchema);