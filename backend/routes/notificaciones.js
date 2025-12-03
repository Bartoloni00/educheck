const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');
const { auth } = require('../middleware/auth');
const {
  getNotificacionesUsuario,
  marcarComoLeida
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
router.put('/leer-todas', auth, async (req, res) => {
  try {
    await Notificacion.updateMany(
      { receptor: req.usuario.id, leida: false },
      { leida: true, fechaLeida: new Date() }
    );

    res.json({ mensaje: 'Todas las notificaciones marcadas como leídas' });
  } catch (error) {
    console.error('Error marcando notificaciones:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// @route   POST /api/notificaciones
// @desc    Enviar mensaje/notificación
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { receptorId, titulo, mensaje, tipo } = req.body;

    if (!receptorId || !titulo || !mensaje) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    const notificacion = new Notificacion({
      emisor: req.usuario.id,
      receptor: receptorId,
      tipo: tipo || 'mensaje',
      titulo,
      mensaje
    });

    await notificacion.save();

    // Enviar notificación en tiempo real
    const io = req.app.get('io');
    io.to(receptorId.toString()).emit('nueva-notificacion', notificacion);

    res.status(201).json({ 
      mensaje: 'Notificación enviada exitosamente', 
      notificacion 
    });
  } catch (error) {
    console.error('Error enviando notificación:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;