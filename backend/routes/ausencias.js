// Archivo: server/routes/ausencias.js

const express = require('express');
const router = express.Router();
const Ausencia = require('../models/Ausencia');
const Notificacion = require('../models/Notificacion');
const { auth, verificarRol } = require('../middleware/auth');

// @route   POST /api/ausencias
// @desc    Reportar ausencia (Docente)
// @access  Private (Docente)
router.post('/', auth, verificarRol('docente'), async (req, res) => {
  try {
    const { institutoId, fechaAusencia, motivo, descripcion } = req.body;

    // Validaciones
    if (!institutoId || !fechaAusencia || !motivo) {
      return res.status(400).json({ 
        mensaje: 'Todos los campos son requeridos' 
      });
    }

    // Verificar que el docente esté asignado a este instituto
    if (!req.usuario.institutosAsignados.includes(institutoId)) {
      return res.status(403).json({ 
        mensaje: 'No estás asignado a este instituto' 
      });
    }

    // Verificar que la fecha no sea pasada
    const fechaAus = new Date(fechaAusencia);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaAus < hoy) {
      return res.status(400).json({ 
        mensaje: 'No puedes reportar ausencias para fechas pasadas' 
      });
    }

    // Crear ausencia
    const ausencia = new Ausencia({
      docente: req.usuario.id,
      instituto: institutoId,
      fechaAusencia,
      motivo,
      descripcion
    });

    await ausencia.save();

    // Crear notificación para el instituto
    const fechaFormateada = new Date(fechaAusencia).toLocaleDateString('es-AR');
    const notificacion = new Notificacion({
      emisor: req.usuario.id,
      receptor: institutoId,
      tipo: 'ausencia',
      titulo: 'Nueva ausencia reportada',
      mensaje: `${req.usuario.nombre} ha reportado una ausencia para el ${fechaFormateada}. Motivo: ${motivo}`
    });

    await notificacion.save();

    // Enviar notificación en tiempo real
    const io = req.app.get('io');
    io.to(institutoId.toString()).emit('nueva-notificacion', notificacion);

    res.status(201).json({
      mensaje: 'Ausencia reportada exitosamente',
      ausencia
    });
  } catch (error) {
    console.error('Error reportando ausencia:', error);
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
});

// @route   GET /api/ausencias
// @desc    Obtener ausencias
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let filtro = {};

    // Si es docente, solo ve sus ausencias
    if (req.usuario.rol === 'docente') {
      filtro.docente = req.usuario.id;
    }

    // Si es instituto, ve ausencias de sus docentes
    if (req.usuario.rol === 'instituto') {
      filtro.instituto = req.usuario.id;
    }

    const ausencias = await Ausencia.find(filtro)
      .populate('docente', 'nombre email telefono')
      .populate('instituto', 'nombre')
      .sort({ fechaAusencia: -1 });

    res.json(ausencias);
  } catch (error) {
    console.error('Error obteniendo ausencias:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// @route   PUT /api/ausencias/:id
// @desc    Actualizar estado de ausencia (Instituto)
// @access  Private (Instituto)
router.put('/:id', auth, verificarRol('instituto'), async (req, res) => {
  try {
    const { estado, respuestaInstituto } = req.body;

    const ausencia = await Ausencia.findById(req.params.id);

    if (!ausencia) {
      return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
    }

    // Verificar que la ausencia sea de este instituto
    if (ausencia.instituto.toString() !== req.usuario.id) {
      return res.status(403).json({ 
        mensaje: 'No tienes permiso para actualizar esta ausencia' 
      });
    }

    ausencia.estado = estado || ausencia.estado;
    ausencia.respuestaInstituto = respuestaInstituto || ausencia.respuestaInstituto;

    await ausencia.save();

    // Crear notificación para el docente
    const notificacion = new Notificacion({
      emisor: req.usuario.id,
      receptor: ausencia.docente,
      tipo: 'ausencia',
      titulo: `Ausencia ${estado}`,
      mensaje: `Tu ausencia para el ${new Date(ausencia.fechaAusencia).toLocaleDateString('es-AR')} ha sido ${estado}. ${respuestaInstituto || ''}`
    });

    await notificacion.save();

    // Enviar notificación en tiempo real
    const io = req.app.get('io');
    io.to(ausencia.docente.toString()).emit('nueva-notificacion', notificacion);

    res.json({
      mensaje: 'Ausencia actualizada exitosamente',
      ausencia
    });
  } catch (error) {
    console.error('Error actualizando ausencia:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;