const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  price:        { type: Number, required: true },
  address:      { type: String, required: true },
  type:         { type: String, required: true }, // ejemplo: "casa", "apartamento", "terreno"
  operation:    { type: String, required: true }, // "venta" o "alquiler"
  images:       [{ type: String }], // URLs o nombres de imágenes
  provider:     { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }, // dueńo-proveedor
  isActive:     { type: Boolean, default: true }, // el admin/proveedor puede desactivar publicación
  createdAt:    { type: Date, default: Date.now },
  updatedAt:    { type: Date, default: Date.now }
});

propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);
