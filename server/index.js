const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <--- Agregamos esto
require('dotenv').config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE MONGODB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodconnect';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB localmente'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Integración de rutas
const rutasAlimentos = require('./routes/alimentos');
app.use('/api/alimentos', rutasAlimentos);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de FoodConnect funcionando correctamente');
});

const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
    console.log(`🚀 Servidor multienlace activo en el puerto 5000`);
});