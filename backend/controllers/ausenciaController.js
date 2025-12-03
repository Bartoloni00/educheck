const Ausencia = require('../models/Ausencia');
const Notificacion = require('../models/Notificacion');

const estadosAdmitidos = ['pendiente', 'aprobada', 'rechazada'];

/**
 * @desc Crea una nueva solicitud de ausencia por parte del docente
 * @route POST /api/ausencias
 * @access Private (Rol: docente)
 */
exports.crearAusencia = async (req, res) => {
    try {
        const { institutoId, fechaAusencia, motivo, descripcion } = req.body;
        const docenteId = req.usuario.id;

        if (!institutoId || !fechaAusencia || !motivo) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
        }

        if (!req.usuario.institutosAsignados.includes(institutoId)) {
            return res.status(403).json({ mensaje: 'No estás asignado a este instituto' });
        }

        const fechaAus = new Date(fechaAusencia);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaAus < hoy) {
            return res.status(400).json({ mensaje: 'No puedes reportar ausencias para fechas pasadas' });
        }

        const ausencia = new Ausencia({
            docente: docenteId,
            instituto: institutoId,
            fechaAusencia,
            motivo,
            descripcion
        });

        await ausencia.save();

        const fechaFormateada = fechaAus.toLocaleDateString('es-AR');
        const notificacion = new Notificacion({
            emisor: docenteId,
            receptor: institutoId,
            tipo: 'ausencia',
            titulo: 'Nueva ausencia reportada',
            mensaje: `${req.usuario.nombre} ha reportado una ausencia para el ${fechaFormateada}. Motivo: ${motivo}`
        });

        await notificacion.save();

        res.status(201).json({ mensaje: 'Ausencia reportada exitosamente', ausencia });
    } catch (error) {
        console.error('Error reportando ausencia:', error);
        res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
    }
};

/**
 * @desc Obtiene todas las ausencias (filtradas por rol)
 * @route GET /api/ausencias
 * @access Private
 */
exports.getAusencias = async (req, res) => {
    try {
        let filtro = {};

        // Lógica de filtrado basada en el rol
        if (req.usuario.rol === 'docente') {
            filtro.docente = req.usuario.id;
        } else if (req.usuario.rol === 'instituto') {
            filtro.instituto = req.usuario.id;
        }

        const ausencias = await Ausencia.find(filtro)
            .populate('docente', 'nombre email telefono')
            .populate('instituto', 'nombre')
            .sort({ fechaAusencia: -1 });

        res.json(ausencias);
    } catch (error) {
        console.error('Error obteniendo ausencias:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

/**
 * @desc Actualiza el estado de una ausencia (Solo Instituto)
 * @route PUT /api/ausencias/:id
 * @access Private (Rol: instituto)
 */
exports.actualizarEstadoAusencia = async (req, res) => {
    try {
        const { estado, respuestaInstituto } = req.body;
        const ausencia = await Ausencia.findById(req.params.id);

        if (!ausencia) {
            return res.status(404).json({ mensaje: 'Ausencia no encontrada' });
        }

        if (!estadosAdmitidos.includes(estado)) {
            return res.status(422).json({
                mensaje: 'El estado seleccionado no se encuentra entre los admitidos (pendiente, aprobada, rechazada)'
            });
        }

        // Se asume que la autorización de rol ('instituto') se hizo en la ruta,
        // pero se debe verificar que la ausencia pertenezca al instituto logueado.
        if (ausencia.instituto.toString() !== req.usuario.id.toString()) {
            console.log('instituto token: ', req.usuario.id)
            console.log('ausencia instituto: ', ausencia.instituto)
            return res.status(403).json({ mensaje: 'No podes modificar una ausencia que no pertenece a tu instituto.' });
        }

        ausencia.estado = estado || ausencia.estado;
        ausencia.respuestaInstituto = respuestaInstituto || ausencia.respuestaInstituto;

        await ausencia.save();

        // Crear y enviar notificación al docente
        const notificacion = new Notificacion({
            emisor: req.usuario.id,
            receptor: ausencia.docente,
            tipo: 'ausencia',
            titulo: `Ausencia ${estado}`,
            mensaje: `Tu ausencia para el ${new Date(ausencia.fechaAusencia).toLocaleDateString('es-AR')} ha sido ${estado}. ${respuestaInstituto || ''}`
        });

        await notificacion.save();

        res.json({ mensaje: 'Ausencia actualizada exitosamente', ausencia });
    } catch (error) {
        console.error('Error actualizando ausencia:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};