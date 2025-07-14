const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  serviceType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', providerSchema);
