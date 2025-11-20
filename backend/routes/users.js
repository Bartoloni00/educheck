// ==========================================
// Archivo: server/routes/users.js
// ==========================================

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

// @route   POST /api/users/asignar
// @desc    Asignar docente a instituto
// @access  Private
router.post('/asignar', auth, async (req, res) => {
  try {
    const { docenteId, institutoId } = req.body;

    if (!docenteId || !institutoId) {
      return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
    }

    const docente = await Usuario.findById(docenteId);
    const instituto = await Usuario.findById(institutoId);

    if (!docente || !instituto) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (docente.rol !== 'docente' || instituto.rol !== 'instituto') {
      return res.status(400).json({ mensaje: 'Roles incorrectos' });
    }

    // Agregar asignación si no existe
    if (!docente.institutosAsignados.includes(institutoId)) {
      docente.institutosAsignados.push(institutoId);
      await docente.save();
    }

    if (!instituto.docentesAsignados.includes(docenteId)) {
      instituto.docentesAsignados.push(docenteId);
      await instituto.save();
    }

    res.json({ mensaje: 'Asignación realizada exitosamente' });
  } catch (error) {
    console.error('Error en asignación:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;

