// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  price:       { type: Number, required: true },
  zone:        { type: String, required: true },
  type:        { type: String, enum: ['alquiler','venta'], required: true },
  images:      [String],
  status:      { type: String, enum: ['disponible','vendida','rentada'], default: 'disponible' },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'Inmobiliaria', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
