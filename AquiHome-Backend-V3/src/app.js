require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/properties', propertyRoutes);
app.use('/api/transactions', transactionRoutes);


app.get('/', (req, res) => {
  res.send('API AquiHome-Backend-V3 funcionando 🚀');
});

module.exports = app;
