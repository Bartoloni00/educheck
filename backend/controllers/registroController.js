// Archivo: server/controllers/registroController.js

const Registro = require('../models/Registro');

/**
 * @desc Registrar una entrada o salida (fichaje)
 * @route POST /api/registros
 * @access Private (solo docentes)
 */
exports.crearRegistro = async (req, res) => {
    // Asume que el ID del usuario viene de req.usuario._id (docente)
    const usuarioId = req.usuario._id; 
    const { instituto, tipo, ubicacion, notas } = req.body; // 'tipo' debe ser 'entrada' o 'salida'

    try {
        const nuevoRegistro = await Registro.create({
            usuario: usuarioId,
            instituto,
            tipo,
            ubicacion,
            notas
        });

        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro', error: error.message });
    }
};

/**
 * @desc Obtener el historial de registros de un usuario
 * @route GET /api/registros/usuario/:usuarioId
 * @access Private
 */
exports.getRegistrosPorUsuario = async (req, res) => {
    // En una aplicación real, se verificaría que req.usuario._id sea igual a req.params.usuarioId 
    // o que el usuario tenga rol de 'instituto' para ver registros de otros.
    try {
        const registros = await Registro.find({ usuario: req.params.usuarioId })
            .sort({ fecha: -1 }) // Los más recientes primero
            .populate('instituto', 'nombre'); // Mostrar nombre del instituto

        res.json(registros);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los registros', error: error.message });
    }
};

// ... Otras funciones como getRegistrosPorInstituto, getUltimoRegistro (para ver si es entrada o salida)