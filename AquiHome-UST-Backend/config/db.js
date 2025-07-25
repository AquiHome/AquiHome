// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/user_crud', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✔️ MongoDB conectado');
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
