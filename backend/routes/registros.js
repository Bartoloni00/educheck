// Archivo: server/routes/registros.js

const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');
const Notificacion = require('../models/Notificacion');
const { auth, verificarRol } = require('../middleware/auth');

// @route   POST /api/registros
// @desc    Registrar entrada o salida
// @access  Private (Docente)
router.post('/', auth, verificarRol('docente'), async (req, res) => {
  try {
    const { institutoId, tipo, ubicacion, notas } = req.body;

    // Validaciones
    if (!institutoId || !tipo) {
      return res.status(400).json({ 
        mensaje: 'Instituto y tipo de registro son requeridos' 
      });
    }

    // Verificar que el docente esté asignado a este instituto
    const docente = req.usuario;
    
    // Convertir los IDs a string para comparación
    const institutosAsignadosStr = docente.institutosAsignados.map(id => id.toString());
    const institutoIdStr = institutoId.toString();
    
    console.log('Docente:', docente.nombre);
    console.log('Institutos asignados:', institutosAsignadosStr);
    console.log('Instituto seleccionado:', institutoIdStr);
    
    if (!institutosAsignadosStr.includes(institutoIdStr)) {
      return res.status(403).json({ 
        mensaje: 'No estás asignado a este instituto',
        debug: {
          institutosAsignados: institutosAsignadosStr,
          institutoSeleccionado: institutoIdStr
        }
      });
    }

    // Crear registro
    const registro = new Registro({
      usuario: req.usuario.id,
      instituto: institutoId,
      tipo,
      ubicacion,
      notas
    });

    await registro.save();

    // Crear notificación para el instituto
    const notificacion = new Notificacion({
      emisor: req.usuario.id,
      receptor: institutoId,
      tipo: 'registro',
      titulo: tipo === 'entrada' ? 'Nueva entrada registrada' : 'Nueva salida registrada',
      mensaje: `${req.usuario.nombre} ha registrado su ${tipo} a las ${new Date().toLocaleTimeString()}`
    });

    await notificacion.save();

    // Enviar notificación en tiempo real
    const io = req.app.get('io');
    if (io) {
      io.to(institutoId.toString()).emit('nueva-notificacion', notificacion);
    }

    res.status(201).json({
      mensaje: 'Registro creado exitosamente',
      registro
    });
  } catch (error) {
    console.error('Error creando registro:', error);
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
});

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
      
      filtro.fecha = {
        $gte: fechaInicio,
        $lte: fechaFin
      };
    }

    const registros = await Registro.find(filtro)
      .populate('usuario', 'nombre email telefono')
      .populate('instituto', 'nombre direccion')
      .sort({ fecha: -1 })
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
      fecha: {
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
      .sort({ fecha: -1 });

    res.json(registros);
  } catch (error) {
    console.error('Error obteniendo registros del día:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;