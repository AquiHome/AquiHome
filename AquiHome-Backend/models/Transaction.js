// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  client:   { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  type:     { type: String, enum: ['venta','alquiler'], required: true },
  date:     { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
