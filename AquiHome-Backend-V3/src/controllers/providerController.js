const Provider = require('../models/provider');

exports.createProvider = async (req, res) => {
  try {
    const data = { ...req.body, role: 'provider' }; // fuerza rol
    delete data.serviceType; // no guardar serviceType aunque venga
    const provider = new Provider(data);
    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProviders = async (req, res) => {
  const providers = await Provider.find();
  res.json(providers);
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(provider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.serviceType !== undefined) delete data.serviceType;
    const provider = await Provider.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!provider) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json(provider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
