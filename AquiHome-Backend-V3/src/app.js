require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Rutas (las agregaremos luego)
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API AquiHome-Backend-V3 funcionando 🚀');
});

module.exports = app;
