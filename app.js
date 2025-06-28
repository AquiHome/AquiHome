// app.js
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

// Import routes
const authRoutes        = require('./routes/authRoutes');
const userRoutes        = require('./routes/userRoutes');
const propertyRoutes    = require('./routes/propertyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const feedRoutes        = require('./routes/feedRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1️⃣ Conectar a MongoDB
connectDB();

// 2️⃣ Middleware para parsear JSON
app.use(express.json());

// 3️⃣ Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.send('🚀 AquíHome API is running');
});

// 4️⃣ Montar rutas de la API
app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/properties',   propertyRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/feed',         feedRoutes);

// 5️⃣ Middleware de manejo de errores
app.use(errorHandler);

// 6️⃣ Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
