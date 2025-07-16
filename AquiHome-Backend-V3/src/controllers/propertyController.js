const Property = require('../models/property');

// ========== ADMIN ==========

// Listar todas las propiedades (admin)
exports.adminGetAll = async (req, res) => {
  try {
    // Puedes agregar paginación/filtros si necesitas
    const props = await Property.find().populate('provider', 'companyName contactEmail');
    res.json(props);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// ========== PROVEEDOR ==========

// Crear propiedad (proveedor)
exports.providerCreate = async (req, res) => {
  try {
    // Asegura que el provider siempre sea el logueado
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
  try {
    // Puedes agregar paginado/filtros
    const props = await Property.find({ provider: req.provider._id });
    res.json(props);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar propiedad (proveedor)
exports.providerUpdate = async (req, res) => {
  try {
    // Sólo puede modificar propiedades propias
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

// ========== PÚBLICO ==========

// Listar propiedades activas (todos)
// Puedes sumar filtros por req.query, ej: precio, habitaciones, piscina, etc.
exports.getAllActive = async (req, res) => {
  try {
    const filter = { isActive: true };

    // Filtros dinámicos para búsqueda avanzada
    if (req.query.type) filter.type = req.query.type;
    if (req.query.operation) filter.operation = req.query.operation;
    if (req.query.rooms) filter.rooms = Number(req.query.rooms);
    if (req.query.bathrooms) filter.bathrooms = Number(req.query.bathrooms);
    if (req.query.minPrice) filter.price = { ...filter.price, $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) filter.price = { ...filter.price, $lte: Number(req.query.maxPrice) };
    if (req.query.garages) filter.garages = Number(req.query.garages);
    if (req.query.gym) filter.gym = req.query.gym === 'true';
    if (req.query.swimmingPool) filter.swimmingPool = req.query.swimmingPool === 'true';
    if (req.query.garden) filter.garden = req.query.garden === 'true';
    if (req.query.barbecue) filter.barbecue = req.query.barbecue === 'true';
    if (req.query.furnished) filter.furnished = req.query.furnished === 'true';

    // Paginación 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const props = await Property.find(filter)
      .populate('provider', 'companyName contactEmail')
      .skip(skip)
      .limit(limit);

    res.json(props);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

