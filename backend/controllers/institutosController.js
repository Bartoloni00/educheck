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

module.exports = {
    registerUserToInstitute
};