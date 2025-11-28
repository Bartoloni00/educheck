const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { auth } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Registrar nuevo usuario
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol, telefono, direccion } = req.body;

    // Validaciones
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ 
        mensaje: 'Por favor completa todos los campos requeridos' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        mensaje: 'La contraseña debe tener al menos 6 caracteres' 
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }

    // Crear usuario
    const usuario = new Usuario({
      nombre,
      email,
      password,
      rol,
      telefono,
      direccion: rol === 'instituto' ? direccion : undefined
    });

    await usuario.save();

    // Crear token
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login de usuario
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        mensaje: 'Por favor ingresa email y contraseña' 
      });
    }

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ 
        mensaje: 'Credenciales inválidas' 
      });
    }

    // Verificar si está activo
    if (!usuario.activo) {
      return res.status(401).json({ 
        mensaje: 'Usuario inactivo. Contacta al administrador' 
      });
    }

    // Verificar contraseña
    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ 
        mensaje: 'Credenciales inválidas' 
      });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '7d' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Obtener usuario actual
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id)
      .select('-password')
      .populate('institutosAsignados', 'nombre email telefono direccion')
      .populate('docentesAsignados', 'nombre email telefono');
    
    res.json(usuario);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;