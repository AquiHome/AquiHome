const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  ciOrRut:   { type: String, required: true, unique: true },
  birthDate: { type: Date },
  isLocked:  { type: Boolean, default: false },
  isActive:  { type: Boolean, default: true },
  lastLogin: { type: Date, default: null },
  registrationDate: { type: Date, default: Date.now },
  favoriteProviders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider', default: [] }],
  favoriteProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: [] }]

});

// Hash el password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Método para comparar password (útil para login)
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
