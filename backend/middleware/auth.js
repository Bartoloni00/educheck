const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensaje: 'No hay token, autorización denegada' });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
    
    // Buscar usuario - IMPORTANTE: NO usar .select('-password') aquí
    const usuario = await Usuario.findById(decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }

    if (!usuario.activo) {
      return res.status(401).json({ mensaje: 'Usuario inactivo' });
    }

    // Agregar usuario a la request CON TODOS SUS CAMPOS
    req.usuario = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      institutosAsignados: usuario.institutosAsignados || [],
      docentesAsignados: usuario.docentesAsignados || []
    };
    
    next();
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    res.status(401).json({ mensaje: 'Token no válido', error: error.message });
  }
};

// Middleware para verificar rol
const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        mensaje: 'No tienes permisos para realizar esta acción' 
      });
    }

    next();
  };
};

module.exports = { auth, verificarRol };