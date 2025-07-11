const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  inmueble_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inmobiliaria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'rechazada'],
    default: 'pendiente'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
