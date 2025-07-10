const House = require('../models/House');

exports.createHouse = async (req, res) => {
  const { title, description, address, price, imageUrls } = req.body;
  const house = await House.create({
    title,
    description,
    address,
    price,
    imageUrls,
    provider: req.user._id,
  });
  res.status(201).json(house);
};

exports.getAllHouses = async (req, res) => {
  const houses = await House.find().populate('provider', 'name email');
  res.json(houses);
};

exports.getHouseById = async (req, res) => {
  const house = await House.findById(req.params.id).populate('provider', 'name email');
  if (!house) return res.status(404).json({ message: 'Casa no encontrada' });
  res.json(house);
};
 