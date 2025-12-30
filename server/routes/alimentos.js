const express = require('express');
const router = express.Router();
const Alimento = require('../models/Alimento');

// RUTA POST: Registrar un nuevo alimento (Automatiza el ingreso)
router.post('/agregar', async (req, res) => {
    try {
        const nuevoAlimento = new Alimento(req.body);
        await nuevoAlimento.save();
        res.status(201).json({ mensaje: 'Alimento registrado con éxito' });
    } catch (error) {
        res.status(400).json({ 
            mensaje: 'Error al registrar el alimento', 
            detalle: error.message 
        });
    }
});

// RUTA GET: Obtener la lista de inventario
router.get('/lista', async (req, res) => {
    try {
        const alimentos = await Alimento.find();
        res.status(200).json(alimentos);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al obtener los datos del inventario' 
        });
    }
});

module.exports = router;
