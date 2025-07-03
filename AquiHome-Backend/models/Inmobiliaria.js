// models/Inmobiliaria.js
const mongoose = require('mongoose');
const User = require('./User');

const inmobiliariaSchema = new mongoose.Schema({
  RUT:            { type: String, required: true, unique: true },
  nombreEmpresa:  { type: String, required: true },
  propiedades:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

module.exports = User.discriminator('inmobiliaria', inmobiliariaSchema);
