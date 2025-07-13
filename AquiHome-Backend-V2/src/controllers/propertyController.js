// src/controllers/propertyController.js
const Property = require('../models/Property');

exports.getAllProperties = async (req, res) => {
  try {
    const filtros = {};

    if (req.query.ciudad) filtros.ciudad = req.query.ciudad;
    if (req.query.departamento) filtros.departamento = req.query.departamento;
    if (req.query.tipo) filtros.tipo = req.query.tipo;
    if (req.query.estado) filtros.estado = req.query.estado;
    if (req.query.dormitorios) filtros.dormitorios = Number(req.query.dormitorios);

    if (req.query.precioMin || req.query.precioMax) {
      filtros.precio = {};
      if (req.query.precioMin) filtros.precio.$gte = Number(req.query.precioMin);
      if (req.query.precioMax) filtros.precio.$lte = Number(req.query.precioMax);
    }

    const propiedades = await Property.find(filtros).populate('usuario_id', 'nombre email');
    res.status(200).json(propiedades);
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

exports.searchProperties = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.status(400).json({ message: 'Falta parámetro de búsqueda (q)' });

    const resultados = await Property.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json(resultados);
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
