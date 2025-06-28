// models/Story.js
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  property:  { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  caption:   String,
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
