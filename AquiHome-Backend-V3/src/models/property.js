const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  // Básico
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  price:        { type: Number, required: true },
  address:      { type: String, required: true },
  location:     { type: String }, // Ciudad, barrio, zona, etc.
  type:         { type: String, required: true }, // casa, apartamento, terreno, local, oficina, etc.
  operation:    { type: String, required: true }, // venta, alquiler, alquiler temporal

  // Números clave
  rooms:        { type: Number, required: true }, // Habitaciones/dormitorios
  bathrooms:    { type: Number, required: true }, // Baños
  suites:       { type: Number, default: 0 },     // Baños en suite
  garages:      { type: Number, default: 0 },
  surfaceTotal: { type: Number }, // m2 total
  surfaceCovered: { type: Number }, // m2 cubiertos

  // Extras (Booleanos)
  balcony:         { type: Boolean, default: false },
  terrace:         { type: Boolean, default: false },
  barbecue:        { type: Boolean, default: false },
  garden:          { type: Boolean, default: false },
  petsAllowed:     { type: Boolean, default: false },
  furnished:       { type: Boolean, default: false },
  heating:         { type: Boolean, default: false },
  woodStove:       { type: Boolean, default: false },
  gym:             { type: Boolean, default: false },
  laundry:         { type: Boolean, default: false },
  swimmingPool:    { type: Boolean, default: false },
  security:        { type: Boolean, default: false }, // Portería/Vigilancia
  garage:          { type: Boolean, default: false },

  // Otros features relevantes
  airConditioning: { type: Boolean, default: false },
  elevator:        { type: Boolean, default: false },
  storageRoom:     { type: Boolean, default: false },
  accessibility:   { type: Boolean, default: false }, // Acceso sillas de ruedas

  // Etiquetas/categorías rápidas
  tags: [{ type: String }], // ej: ["A estrenar", "Recién reciclado"]

  // Imágenes
  images:       [{ type: String }], // URLs

  // Relación
  provider:     { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  isActive:     { type: Boolean, default: true },

  // Geo (opcional)
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },

  // Customizable
  customExtras: [{ type: String }],

  createdAt:    { type: Date, default: Date.now },
  updatedAt:    { type: Date, default: Date.now }
});

propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);
