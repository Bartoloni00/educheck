const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');
const { auth } = require('../middleware/auth');
const {
  getNotificacionesUsuario,
  marcarComoLeida,
  leerTodas,
  crearNotificacion
} = require('../controllers/notificacionController')

// @route   GET /api/notificaciones
// @desc    Obtener notificaciones del usuario
// @access  Private
router.get('/', auth, getNotificacionesUsuario);

// @route   PUT /api/notificaciones/:id/leer
// @desc    Marcar notificación como leída
// @access  Private
router.put('/:id/leer', auth, marcarComoLeida);

// @route   PUT /api/notificaciones/leer-todas
// @desc    Marcar todas las notificaciones como leídas
// @access  Private
router.put('/leer-todas', auth, leerTodas);

// @route   POST /api/notificaciones
// @desc    Enviar mensaje/notificación
// @access  Private
router.post('/', auth, crearNotificacion);

module.exports = router;