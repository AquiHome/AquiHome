require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');

const authRoutes     = require('./routes/auth');
const houseRoutes    = require('./routes/houses');      // si usas House
const propertyRoutes = require('./routes/properties');  // o properties

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// monta las rutas
app.use('/api/auth',       authRoutes);
app.use('/api/houses',     houseRoutes);      // opcional
app.use('/api/properties', propertyRoutes);   // tu endpoint de propiedades

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✔️  Servidor corriendo en http://localhost:${PORT}`)
);
