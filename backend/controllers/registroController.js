const Registro = require('../models/Registro');
const Notificacion = require('../models/Notificacion');

const registrarAsistencia = async (req, res) => {
    try {
        const usuario = req.usuario; // docente autenticado
        const { institutoId, tipo, notas } = req.body;

        if (!institutoId || !tipo) {
            return res.status(400).json({
                mensaje: 'Instituto y tipo de registro son requeridos'
            });
        }

        if (!['entrada', 'salida'].includes(tipo)) {
            return res.status(400).json({
                mensaje: "El tipo debe ser 'entrada' o 'salida'"
            });
        }

        const institutosAsignadosStr = usuario.institutosAsignados.map(id => id.toString());
        const institutoIdStr = institutoId.toString();

        if (!institutosAsignadosStr.includes(institutoIdStr)) {
            return res.status(403).json({
                mensaje: 'No estás asignado a este instituto'
            });
        }

        const registro = await Registro.create({
            usuario: usuario.id.toString(),
            instituto: institutoId,
            tipo,
            notas
        });

        await Notificacion.create({
            emisor: usuario.id.toString(),
            receptor: institutoId,
            tipo: 'registro',
            titulo: tipo === 'entrada'
                ? 'Nueva entrada registrada'
                : 'Nueva salida registrada',
            mensaje: `${usuario.nombre} registró su ${tipo} a las ${new Date().toLocaleTimeString()}`
        });

        res.status(201).json({
            mensaje: 'Registro creado exitosamente',
            registro
        });

    } catch (error) {
        console.error('Error creando registro:', error);
        res.status(500).json({
            mensaje: 'Error del servidor',
            error: error.message
        });
    }
};

/**
 * @desc Obtener el historial de registros de un usuario
 * @route GET /api/registros/usuario/:usuarioId
 * @access Private
 */
const getRegistrosPorUsuario = async (req, res) => {
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

module.exports = {
    registrarAsistencia,
    getRegistrosPorUsuario
};