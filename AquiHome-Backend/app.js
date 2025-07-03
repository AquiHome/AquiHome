require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const authRoutes        = require('./routes/authRoutes');
const userRoutes        = require('./routes/userRoutes');
const propertyRoutes    = require('./routes/propertyRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const feedRoutes        = require('./routes/feedRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 AquíHome API is running');
});

app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/properties',   propertyRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/feed',         feedRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
