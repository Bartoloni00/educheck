const Ausencia = require('../models/Ausencia');

/**
 * @desc Crear una nueva solicitud de ausencia
 * @route POST /api/ausencias
 * @access Private (solo docentes)
 */
exports.crearAusencia = async (req, res) => {
    // Asume que el ID del docente viene de req.usuario._id
    const docenteId = req.usuario._id; 
    const { instituto, fechaAusencia, motivo, descripcion } = req.body;

    try {
        const nuevaAusencia = await Ausencia.create({
            docente: docenteId,
            instituto,
            fechaAusencia,
            motivo,
            descripcion
        });

        res.status(201).json(nuevaAusencia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la ausencia', error: error.message });
    }
};

/**
 * @desc Obtener una ausencia por ID
 * @route GET /api/ausencias/:id
 * @access Private
 */
exports.getAusenciaPorId = async (req, res) => {
    try {
        const ausencia = await Ausencia.findById(req.params.id)
            .populate('docente', 'nombre email rol')
            .populate('instituto', 'nombre email rol');

        if (ausencia) {
            res.json(ausencia);
        } else {
            res.status(404).json({ mensaje: 'Ausencia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la ausencia', error: error.message });
    }
};

/**
 * @desc Actualizar el estado de una ausencia (Aprobada/Rechazada)
 * @route PUT /api/ausencias/:id/estado
 * @access Private (solo institutos)
 */
exports.actualizarEstadoAusencia = async (req, res) => {
    // Asume que el ID del instituto viene de req.usuario._id y que es un 'instituto'
    const { estado, respuestaInstituto } = req.body; 

    try {
        const ausencia = await Ausencia.findById(req.params.id);

        if (!ausencia) {
            return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
        }
        
        // **Añadir lógica de autorización aquí (e.g., verificar que ausencia.instituto sea igual a req.usuario._id)**

        if (['aprobada', 'rechazada'].includes(estado)) {
            ausencia.estado = estado;
            ausencia.respuestaInstituto = respuestaInstituto || ausencia.respuestaInstituto;
            
            const ausenciaActualizada = await ausencia.save();
            res.json(ausenciaActualizada);
            
            // **Aquí se podría disparar la creación de una Notificación**
        } else {
            res.status(400).json({ mensaje: 'Estado inválido' });
        }

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado de la ausencia', error: error.message });
    }
};