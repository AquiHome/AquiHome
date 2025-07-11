require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');

const authRoutes     = require('./routes/auth');
const propertyRoutes = require('./routes/properties'); 
const transactionRoutes = require('./routes/transactions');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// monta las rutas
app.use('/api/auth',       authRoutes);
app.use('/api/properties', propertyRoutes);   
app.use('/api/transactions', transactionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✔️  Servidor corriendo en http://localhost:${PORT}`)
);
