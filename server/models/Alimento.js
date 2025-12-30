const mongoose = require('mongoose');

// Definición del esquema para automatizar el control de alimentos
const AlimentoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del alimento es obligatorio'],
        trim: true
    },
    categoria: { 
        type: String, 
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    cantidad: { 
        type: Number, 
        required: true,
        min: [1, 'La cantidad debe ser al menos 1']
    },
    fechaVencimiento: { 
        type: Date, 
        required: [true, 'La fecha de vencimiento es clave para la automatización']
    },
    fechaRegistro: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Alimento', AlimentoSchema);
