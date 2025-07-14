const Property = require('../models/property');

// ======= ADMIN =======

// Listar todas las propiedades (admin)
exports.adminGetAll = async (req, res) => {
  const props = await Property.find().populate('provider', 'companyName contactEmail');
  res.json(props);
};

// Crear propiedad como admin (puede pasarle el providerId)
exports.adminCreate = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar propiedad por ID (admin)
exports.adminUpdate = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar propiedad por ID (admin)
exports.adminDelete = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });
    res.json({ message: 'Propiedad eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener propiedad por ID (admin)
exports.adminGetById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('provider', 'companyName contactEmail');
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ======= PÚBLICO (usuarios/proveedores) =======

// Listar propiedades activas (todos)
exports.getAllActive = async (req, res) => {
  const props = await Property.find({ isActive: true }).populate('provider', 'companyName contactEmail');
  res.json(props);
};

// Obtener propiedad activa por ID (todos)
exports.getActiveById = async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, isActive: true }).populate('provider', 'companyName contactEmail');
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada o no activa' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ======= PROVEEDORES =======

// Crear propiedad (proveedor)
exports.providerCreate = async (req, res) => {
  try {
    const data = { ...req.body, provider: req.provider._id };
    const property = new Property(data);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Ver mis propiedades (proveedor)
exports.providerListMine = async (req, res) => {
  const props = await Property.find({ provider: req.provider._id });
  res.json(props);
};

// Editar propiedad (proveedor)
exports.providerUpdate = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, provider: req.provider._id },
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada o no es tuya' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar propiedad (proveedor)
exports.providerDelete = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, provider: req.provider._id });
    if (!property) return res.status(404).json({ error: 'Propiedad no encontrada o no es tuya' });
    res.json({ message: 'Propiedad eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
