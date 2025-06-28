// controllers/propertyController.js
const Property = require('../models/Property');

// Crear una nueva propiedad (solo inmobiliarias)
exports.createProperty = async (req, res) => {
  try {
    if (req.user.role !== 'inmobiliaria') {
      return res.status(403).json({ message: 'Solo las inmobiliarias pueden crear propiedades.' });
    }

    const prop = new Property({
      ...req.body,
      owner: req.user._id
    });
    await prop.save();
    res.status(201).json(prop);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear propiedad', error });
  }
};

// Listar y filtrar propiedades (público)
exports.getProperties = async (req, res) => {
  try {
    const { zone, type, minPrice, maxPrice } = req.query;
    const filter = {};
    if (zone) filter.zone = zone;
    if (type) filter.type = type;
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

// Obtener una propiedad por ID (público)
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

// Actualizar una propiedad (solo su creador)
exports.updateProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada.' });

    // 1️⃣ Solo inmobiliarias
    if (req.user.role !== 'inmobiliaria') {
      return res.status(403).json({ message: 'Solo las inmobiliarias pueden actualizar propiedades.' });
    }
    // 2️⃣ Solo el owner que la creó
    if (prop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No eres el dueño de esta propiedad.' });
    }

    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar propiedad', error });
  }
};

// Eliminar una propiedad (solo su creador)
exports.deleteProperty = async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Propiedad no encontrada.' });

    // 1️⃣ Solo inmobiliarias
    if (req.user.role !== 'inmobiliaria') {
      return res.status(403).json({ message: 'Solo las inmobiliarias pueden eliminar propiedades.' });
    }
    // 2️⃣ Solo el owner que la creó
    if (prop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No eres el dueño de esta propiedad.' });
    }

    await prop.remove();
    res.json({ message: 'Propiedad eliminada correctamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar propiedad', error });
  }
};
