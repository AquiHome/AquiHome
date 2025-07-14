const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Provider = require('../models/provider');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.authUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'user') return res.status(403).json({ error: 'No autorizado' });
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

exports.authProvider = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== 'provider') return res.status(403).json({ error: 'No autorizado' });
    const provider = await Provider.findById(decoded.id);
    if (!provider) return res.status(404).json({ error: 'No encontrado' });
    req.provider = provider;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
