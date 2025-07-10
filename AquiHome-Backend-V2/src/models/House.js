const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  address:      { type: String, required: true },
  price:        { type: Number, required: true },
  imageUrls:    [{ type: String }],
  provider:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('House', houseSchema);
