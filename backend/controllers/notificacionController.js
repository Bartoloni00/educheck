// Archivo: server/controllers/notificacionController.js

const Notificacion = require('../models/Notificacion');

/**
 * @desc Obtener todas las notificaciones de un usuario
 * @route GET /api/notificaciones
 * @access Private
 */
exports.getNotificacionesUsuario = async (req, res) => {
    // Asume que el ID del receptor viene de req.usuario._id
    const receptorId = req.usuario._id; 

    try {
        const notificaciones = await Notificacion.find({ receptor: receptorId })
            .sort({ createdAt: -1 })
            .populate('emisor', 'nombre email rol'); 

        res.json(notificaciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las notificaciones', error: error.message });
    }
};

/**
 * @desc Marcar una notificación como leída
 * @route PUT /api/notificaciones/:id/leer
 * @access Private
 */
exports.marcarComoLeida = async (req, res) => {
    try {
        const notificacion = await Notificacion.findById(req.params.id);

        if (!notificacion) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }

        // **Añadir lógica de autorización (que el receptor sea req.usuario._id)**

        if (!notificacion.leida) {
            notificacion.leida = true;
            notificacion.fechaLeida = new Date();
            await notificacion.save();
        }

        res.json({ mensaje: 'Notificación marcada como leída', notificacion });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al marcar la notificación como leída', error: error.message });
    }
};

// ... Otras funciones como eliminarNotificacion, getNotificacionesNoLeidas