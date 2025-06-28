// controllers/feedController.js
const Story = require('../models/Story');
const Property = require('../models/Property');

// Historias (Stories)
exports.getStories = async (req, res) => {
  const now = new Date();
  const stories = await Story.find({ expiresAt: { $gt: now } })
                             .sort({ createdAt: -1 });
  res.json(stories);
};

// Feed de propiedades
exports.getFeed = async (req, res) => {
  const properties = await Property.find({ status: 'disponible' })
                                   .sort({ createdAt: -1 })
                                   .limit(20);
  res.json(properties);
};
