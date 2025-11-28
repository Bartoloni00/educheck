const Usuario = require('../models/Usuario');

async function registerUserToInstitute(req, res) {
    const usuarioId = req.usuario.id.toString();
    const { institutoId } = req.params;

    try {
        const instituto = await Usuario.findById(institutoId);
        const docente = await Usuario.findById(usuarioId);
        
        if (!docente) return res.status(404).json({ mensaje: 'Docente no encontrado' });
        if (!instituto) return res.status(404).json({ mensaje: 'Instituto no encontrado' });
        if (instituto.rol !== 'instituto') return res.status(400).json({ mensaje: 'Roles incorrectos' });

        // Asignar docente al instituto
        if (!instituto.docentesAsignados.some(id => id.toString() === usuarioId)) {
            instituto.docentesAsignados.push(usuarioId);
            await instituto.save();
        }

        // Asignar instituto al docente
        if (!docente.institutosAsignados.some(id => id.toString() === institutoId)) {
            docente.institutosAsignados.push(institutoId);
            await docente.save();
        }

        res.json({ mensaje: `Se asigno al profesor: ${docente.nombre} al instituto: ${instituto.nombre}` });
    } catch (error) {
        console.error('Error en asignación:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

async function removeUserFromInstitute(req, res) {
    const usuarioId = req.usuario.id.toString();
    const { institutoId } = req.params;

    try {
        const instituto = await Usuario.findById(institutoId);
        const docente = await Usuario.findById(usuarioId);

        if (!docente) return res.status(404).json({ mensaje: 'Docente no encontrado' });
        if (!instituto) return res.status(404).json({ mensaje: 'Instituto no encontrado' });
        if (instituto.rol !== 'instituto') return res.status(400).json({ mensaje: 'Roles incorrectos' });

        const antesDocentes = instituto.docentesAsignados.length;
        instituto.docentesAsignados = instituto.docentesAsignados.filter(
            id => id.toString() !== usuarioId
        );

        const antesInstitutos = docente.institutosAsignados.length;
        docente.institutosAsignados = docente.institutosAsignados.filter(
            id => id.toString() !== institutoId
        );

        if (
            antesDocentes === instituto.docentesAsignados.length &&
            antesInstitutos === docente.institutosAsignados.length
        ) {
            return res.status(400).json({
                mensaje: "El docente no está asignado a este instituto"
            });
        }

        await instituto.save();
        await docente.save();

        res.json({
            mensaje: `Se desasignó al profesor ${docente.nombre} del instituto ${instituto.nombre}`
        });

    } catch (error) {
        console.error('Error en desasignación:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
}

module.exports = {
    registerUserToInstitute,
    removeUserFromInstitute
};