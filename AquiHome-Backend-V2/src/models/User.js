const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nombre:        { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  telefono:      { type: String, required: true },
  direccion:     { type: String, required: true },
  ciudad:        { type: String, required: true },
  departamento:  { type: String, required: true },
  tipo_usuario:  { 
    type: String, 
    enum: ['particular','inmobiliaria','otro'], 
    default: 'particular' 
  },
  puntos: {
  type: Number,
  default: 0
},
  isLockedAccount: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: 'fecha_registro',
    updatedAt: 'updatedAt'
  }
});





// 🔐 Hashear password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Método para comparar contraseña
userSchema.methods.matchPassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);
