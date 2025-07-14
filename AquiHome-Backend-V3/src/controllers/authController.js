const User = require('../models/user');
const Provider = require('../models/provider');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; // Usá una variable de entorno real en producción

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    if (!await user.comparePassword(password)) return res.status(400).json({ error: 'Password incorrecto' });
    if (user.isLocked) return res.status(403).json({ error: 'Usuario bloqueado' });
    if (!user.isActive) return res.status(403).json({ error: 'Cuenta inactiva' });

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id, type: 'user' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Error de servidor' });
  }
};

exports.loginProvider = async (req, res) => {
  const { contactEmail, password } = req.body;
  try {
    const provider = await Provider.findOne({ contactEmail });
    if (!provider) return res.status(400).json({ error: 'Proveedor no encontrado' });
    if (!await provider.comparePassword(password)) return res.status(400).json({ error: 'Password incorrecto' });
    if (provider.isLocked) return res.status(403).json({ error: 'Proveedor bloqueado' });
    if (!provider.isActive) return res.status(403).json({ error: 'Cuenta inactiva' });

    provider.lastLogin = new Date();
    await provider.save();

    const token = jwt.sign({ id: provider._id, type: 'provider' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, provider });
  } catch (err) {
    res.status(500).json({ error: 'Error de servidor' });
  }
};
