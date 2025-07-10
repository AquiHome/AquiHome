// src/controllers/propertyController.js
const Property = require('../models/Property');

exports.getAllProperties = async (req, res) => {
  try {
    const props = await Property.find()
      .populate('usuario_id', 'nombre email');
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id)
      .populate('usuario_id', 'nombre email');
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.json(prop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const data = { ...req.body, usuario_id: req.user._id };
    const prop = await Property.create(data);
    res.status(201).json(prop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const prop = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.json(prop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findByIdAndDelete(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada' });
    res.json({ message: 'Propiedad eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
