const Notificacion = require('../models/Notificacion');

/**
 * @desc Obtener todas las notificaciones de un usuario
 * @route GET /api/notificaciones
 * @access Private
 */
exports.getNotificacionesUsuario = async (req, res) => {
    const receptorId = req.usuario.id; 

      try {
        const notificaciones = await Notificacion.find({ receptor: receptorId })
          .populate('emisor', 'nombre email rol')
          .sort({ createdAt: -1 })
          .limit(50);
    
        const noLeidas = await Notificacion.countDocuments({ 
          receptor: receptorId, 
          leida: false 
        });
    
        res.json({ notificaciones, noLeidas });
      } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor' });
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