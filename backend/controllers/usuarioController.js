// Archivo: server/controllers/usuarioController.js

const Usuario = require('../models/Usuario');
// Se asume la existencia de un generador de tokens para el login
// const generarToken = require('../utils/generarToken'); // Si usas JWT

/**
 * @desc Registrar un nuevo usuario (docente o instituto)
 * @route POST /api/usuarios/registro
 * @access Public
 */
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password, rol, telefono, direccion } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ email });

        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        const usuario = await Usuario.create({
            nombre,
            email,
            password,
            rol,
            telefono,
            direccion: rol === 'instituto' ? direccion : undefined,
        });

        if (usuario) {
            // Eliminar password del objeto de respuesta por seguridad
            const usuarioRespuesta = usuario.toObject();
            delete usuarioRespuesta.password;

            res.status(201).json({
                ...usuarioRespuesta,
                // token: generarToken(usuario._id), // Si usas tokens
            });
        } else {
            res.status(400).json({ mensaje: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};

/**
 * @desc Autenticar usuario y obtener token
 * @route POST /api/usuarios/login
 * @access Public
 */
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (usuario && (await usuario.compararPassword(password))) {
            // Eliminar password del objeto de respuesta por seguridad
            const usuarioRespuesta = usuario.toObject();
            delete usuarioRespuesta.password;

            res.json({
                ...usuarioRespuesta,
                // token: generarToken(usuario._id), // Si usas tokens
            });
        } else {
            res.status(401).json({ mensaje: 'Email o contraseña inválidos' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

/**
 * @desc Obtener perfil de usuario (requiere autenticación)
 * @route GET /api/usuarios/perfil
 * @access Private
 */
exports.getPerfilUsuario = async (req, res) => {
    // Asume que req.usuario ha sido poblado por un middleware de autenticación
    try {
        const usuario = await Usuario.findById(req.usuario._id).select('-password');

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el perfil', error: error.message });
    }
};

// ... Puedes añadir más funciones como actualizarPerfil, asignarDocenteAInstituto, etc.