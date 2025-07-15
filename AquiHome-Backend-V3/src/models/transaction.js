const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  property:    { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  provider:    { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  customer:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:      {
    type: String,
    enum: ['pending', 'provider_confirmed', 'customer_confirmed', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  providerConfirmed: { type: Boolean, default: false },
  customerConfirmed: { type: Boolean, default: false },
  cancelledBy:       { type: String, enum: ['provider', 'customer', 'admin', null], default: null },
  note:              { type: String },
  createdAt:         { type: Date, default: Date.now },
  updatedAt:         { type: Date, default: Date.now }
});

transactionSchema.methods.tryConfirm = function () {
  if (this.providerConfirmed && this.customerConfirmed) {
    this.status = 'confirmed';
  } else if (this.providerConfirmed) {
    this.status = 'provider_confirmed';
  } else if (this.customerConfirmed) {
    this.status = 'customer_confirmed';
  } else {
    this.status = 'pending';
  }
};

transactionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  this.tryConfirm();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
