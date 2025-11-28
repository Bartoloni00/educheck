const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { auth } = require('../middleware/auth');
const { registerUserToInstitute } = require('../controllers/institutosController');

// Obtener todos los institutos
router.get('/', async (req, res) => {
  try {
    const institutos = await Usuario.find({ rol: "instituto" })
      .select('nombre email telefono direccion');  

    res.json(institutos);
  } catch (error) {
    console.error("Error cargando institutos:", error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});

router.post('/:institutoId/asignar', auth, registerUserToInstitute);

module.exports = router;
