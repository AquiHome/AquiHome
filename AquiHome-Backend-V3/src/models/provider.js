const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const providerSchema = new mongoose.Schema({
  companyName:   { type: String, required: true },
  contactEmail:  { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  ciOrRut:       { type: String, required: true, unique: true },
  birthDate:     { type: Date },
  serviceType:   { type: String, required: true },
  isLocked:      { type: Boolean, default: false },
  isActive:      { type: Boolean, default: false },
  lastLogin:     { type: Date, default: null },
  registrationDate: { type: Date, default: Date.now }
});

// Hash el password antes de guardar
providerSchema.pre('save', async function(next) {
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
providerSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Provider', providerSchema);
