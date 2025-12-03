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
        if (notificacion.receptor.toString() !== req.usuario.id.toString()) {
          return res.status(403).json({ mensaje: 'Esta notificacion no te pertenece.' });
        }

        // Añadir lógica de autorización (que el receptor sea req.usuario._id)
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

/**
 * @desc Marcar todas las notificaciones como leidas
 * @route PUT /api/notificaciones/leet-todas
 * @access Private
 */
exports.leerTodas = async (req, res) => {
  const receptorId = req.usuario.id; 

  try {
      await Notificacion.updateMany(
        { receptor: receptorId, leida: false },
        { leida: true, fechaLeida: new Date() }
      );

      res.json({ mensaje: 'Todas las notificaciones fueron marcadas como leídas' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

/** 
* @route   POST /api/notificaciones
* @desc    Enviar mensaje/notificación
* @access  Private
*/
exports.crearNotificacion = async (req, res) => {
  const {receptorId, titulo, mensaje, tipo } = req.body;
  const emisorId = req.usuario.id;
  if (!receptorId || !titulo || !mensaje) {
    return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
  }

  const estadosAdmitidos = ['mensaje', 'ausencia', 'registro', 'sistema']
  if (tipo && !estadosAdmitidos.includes(tipo)) {
    return res.status(422).json({
        mensaje: 'El estado seleccionado no se encuentra entre los admitidos (mensaje, ausencia, registro, sistema)'
    });
  }

  try {
    const notificacion = new Notificacion({
      emisor: emisorId,
      receptor: receptorId,
      tipo: tipo || 'mensaje',
      titulo,
      mensaje
    });

    await notificacion.save();

    res.status(201).json({ 
      mensaje: 'Notificación enviada exitosamente', 
      notificacion 
    });
  } catch (error) {
    console.error('Error enviando notificación:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
}