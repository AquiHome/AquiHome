// models/Cliente.js
const mongoose = require('mongoose');
const User = require('./User');

const clienteSchema = new mongoose.Schema({
  cedulaIdentidad: { type: String, required: true, unique: true },
  favoritos:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  zonasFavoritas:   [String],
  zonasBloqueadas:  [String],
  puntos:           { type: Number, default: 0 }
});

module.exports = User.discriminator('cliente', clienteSchema);
