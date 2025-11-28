const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { auth, verificarRol } = require('../middleware/auth');

// @route   GET /api/users/institutos
// @desc    Obtener lista de institutos
// @access  Private (Docente)
router.get('/institutos', auth, verificarRol('docente'), async (req, res) => {
  try {
    let filtro = { rol: 'instituto', activo: true };
    
    if (req.usuario.institutosAsignados.length > 0) {
      filtro._id = { $in: req.usuario.institutosAsignados };
    }

    const institutos = await Usuario.find(filtro)
      .select('nombre email telefono direccion');

    res.json(institutos);
  } catch (error) {
    console.error('Error obteniendo institutos:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// @route   GET /api/users/docentes
// @desc    Obtener lista de docentes
// @access  Private (Instituto)
router.get('/docentes', auth, verificarRol('instituto'), async (req, res) => {
  try {
    let filtro = { rol: 'docente', activo: true };
    
    if (req.usuario.docentesAsignados.length > 0) {
      filtro._id = { $in: req.usuario.docentesAsignados };
    }

    const docentes = await Usuario.find(filtro)
      .select('nombre email telefono');

    res.json(docentes);
  } catch (error) {
    console.error('Error obteniendo docentes:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;

