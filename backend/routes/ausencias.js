const express = require('express');
const router = express.Router();
const { 
    crearAusencia, 
    getAusencias, 
    actualizarEstadoAusencia 
} = require('../controllers/ausenciaController'); 
const { auth, verificarRol } = require('../middleware/auth'); 

// @route   POST /api/ausencias
// @desc    Crear nueva ausencia (Docente)
// @access  Private (docente)
router.post('/', auth, verificarRol('docente'), crearAusencia);

// @route   GET /api/ausencias
// @desc    Obtener lista de ausencias (filtrado por rol)
// @access  Private
router.get('/', auth, getAusencias);

// @route   PUT /api/ausencias/:id
// @desc    Actualizar estado de ausencia (Instituto)
// @access  Private (instituto)
router.put('/:id', auth, verificarRol('instituto'), actualizarEstadoAusencia);

module.exports = router;