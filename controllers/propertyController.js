// controllers/propertyController.js
const Property = require('../models/Property');

// Crear una nueva propiedad (Inmobiliaria debe estar autenticada)
exports.createProperty = async (req, res) => {
  try {
    const prop = new Property({ 
      ...req.body, 
      owner: req.user._id   // asume que tu middleware injecta req.user
    });
    await prop.save();
    res.status(201).json(prop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear propiedad', error });
  }
};

// Listar y filtrar propiedades (acceso público)
exports.getProperties = async (req, res) => {
  try {
    const { zone, type, minPrice, maxPrice } = req.query;
    const filter = {};
    if (zone)       filter.zone  = zone;
    if (type)       filter.type  = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const props = await Property.find(filter);
    res.json(props);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener propiedades', error });
  }
};

// Obtener una propiedad por ID (acceso público)
exports.getPropertyById = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada.' });
    res.json(prop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener propiedad', error });
  }
};

// Actualizar una propiedad (solo su owner autenticado)
exports.updateProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada.' });

    // Opcional: valida que req.user._id === prop.owner para seguridad

    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar propiedad', error });
  }
};

// Eliminar una propiedad (solo su owner autenticado)
exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada.' });

    // Opcional: valida que req.user._id === prop.owner

    await prop.remove();
    res.json({ message: 'Propiedad eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar propiedad', error });
  }
};
