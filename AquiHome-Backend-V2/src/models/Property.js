const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  titulo:               { type: String, required: true },
  descripcion:          { type: String },
  direccion:            { type: String, required: true },
  ciudad:               { type: String, required: true },
  departamento:         { type: String, required: true },
  precio:               { type: Number, required: true },
  moneda: {
    type: String,
    enum: ['UYU', 'USD', 'EUR', 'AR$'],
    default: 'UYU'
  },
  tipo: {
    type: String,
    enum: ['casa', 'apartamento', 'terreno'],
    required: true
  },
  superficie:           { type: Number },
  superficie_edificada: { type: Number },
  dormitorios:          { type: Number },
  banos:                { type: Number },
  garaje:               { type: Boolean, default: false },
  anio_construccion:    { type: Number },
  estado: {
    type: String,
    enum: ['a estrenar', 'en construcción', 'usado'],
    default: 'usado'
  }
}, {
  timestamps: {
    createdAt: 'fecha_publicacion',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Property', propertySchema);
