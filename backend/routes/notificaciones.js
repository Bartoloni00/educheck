const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');
const { auth } = require('../middleware/auth');

// @route   GET /api/notificaciones
// @desc    Obtener notificaciones del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ receptor: req.usuario.id })
      .populate('emisor', 'nombre email rol')
      .sort({ createdAt: -1 })
      .limit(50);

    const noLeidas = await Notificacion.countDocuments({ 
      receptor: req.usuario.id, 
      leida: false 
    });

    res.json({ notificaciones, noLeidas });
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// @route   PUT /api/notificaciones/:id/leer
// @desc    Marcar notificación como leída
// @access  Private
router.put('/:id/leer', auth, async (req, res) => {
  try {
    const notificacion = await Notificacion.findById(req.params.id);

    if (!notificacion) {
      return res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }

    if (notificacion.receptor.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'No autorizado' });
    }

    notificacion.leida = true;
    notificacion.fechaLeida = new Date();
    await notificacion.save();

    res.json({ mensaje: 'Notificación marcada como leída', notificacion });
  } catch (error) {
    console.error('Error marcando notificación:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

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