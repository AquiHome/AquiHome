const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  property:  { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  caption:   { type: String },
  expiresAt: { type: Date, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Story', storySchema);
