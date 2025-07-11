const mongoose = require('mongoose');
const User = require('./User');

const inmobiliariaSchema = new mongoose.Schema({
  RUT:           { type: String, required: true, unique: true },
  nombreEmpresa: { type: String, required: true },
  propiedades:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
}, {
  timestamps: true
});

module.exports = User.discriminator('Inmobiliaria', inmobiliariaSchema);
