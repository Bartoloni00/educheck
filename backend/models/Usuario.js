// Archivo: server/models/Usuario.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['docente', 'instituto'],
    required: true
  },
  telefono: {
    type: String,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  // Solo para institutos
  direccion: {
    type: String,
    trim: true
  },
  docentesAsignados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  // Solo para docentes
  institutosAsignados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
}, {
  timestamps: true
});

// Hash password antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar passwords
usuarioSchema.methods.compararPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);