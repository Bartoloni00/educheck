const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');
const { auth, verificarRol } = require('../middleware/auth');
const { registrarAsistencia } = require('../controllers/registroController');

// @route   POST /api/registros
// @desc    Registrar entrada o salida
// @access  Private (Docente)
router.post('/', auth, verificarRol('docente'), registrarAsistencia);

// @route   GET /api/registros
// @desc    Obtener registros (filtrados por rol)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { fecha, institutoId, usuarioId } = req.query;
    let filtro = {};

    // Si es docente, solo ve sus registros
    if (req.usuario.rol === 'docente') {
      filtro.usuario = req.usuario.id;
      if (institutoId) {
        filtro.instituto = institutoId;
      }
    }

    // Si es instituto, ve registros de sus docentes
    if (req.usuario.rol === 'instituto') {
      filtro.instituto = req.usuario.id;
      if (usuarioId) {
        filtro.usuario = usuarioId;
      }
    }

    // Filtro por fecha
    if (fecha) {
      const fechaInicio = new Date(fecha);
      fechaInicio.setHours(0, 0, 0, 0);
      const fechaFin = new Date(fecha);
      fechaFin.setHours(23, 59, 59, 999);
      
      filtro.createdAt = {
        $gte: fechaInicio,
        $lte: fechaFin
      };
    }

    const registros = await Registro.find(filtro)
      .populate('usuario', 'nombre email telefono')
      .populate('instituto', 'nombre direccion')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(registros);
  } catch (error) {
    console.error('Error obteniendo registros:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// @route   GET /api/registros/hoy
// @desc    Obtener registros del día actual
// @access  Private
router.get('/hoy', auth, async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    let filtro = {
      createdAt: {
        $gte: hoy,
        $lte: finDia
      }
    };

    if (req.usuario.rol === 'docente') {
      filtro.usuario = req.usuario.id;
    } else if (req.usuario.rol === 'instituto') {
      filtro.instituto = req.usuario.id;
    }

    const registros = await Registro.find(filtro)
      .populate('usuario', 'nombre email')
      .populate('instituto', 'nombre')
      .sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    console.error('Error obteniendo registros del día:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;