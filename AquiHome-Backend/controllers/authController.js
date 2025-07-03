// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Cliente = require('../models/Cliente');
const Inmobiliaria = require('../models/Inmobiliaria');

// Registro (discriminators)
exports.register = async (req, res) => {
  const { role, ...userData } = req.body;
  let newUser;
  if (role === 'cliente') {
    newUser = new Cliente({ ...userData, role });
  } else if (role === 'inmobiliaria') {
    newUser = new Inmobiliaria({ ...userData, role });
  } else {
    return res.status(400).json({ message: 'Role inválido.' });
  }
  await newUser.save();
  res.status(201).json({ message: 'Usuario registrado correctamente.' });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, active: true });
  if (!user) return res.status(400).json({ message: 'Usuario no encontrado o inactivo.' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas.' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({
    token,
    user: { id: user._id, name: user.name, role: user.role }
  });
};

// Reset Password (sin e-mail externo)
exports.resetPassword = async (req, res) => {
  const { email, role, identifier, newPassword } = req.body;
  if (!email || !role || !identifier || !newPassword) {
    return res.status(400).json({ message: 'Faltan datos para reset.' });
  }

  let user;
  if (role === 'cliente') {
    user = await Cliente.findOne({ email, cedulaIdentidad: identifier, active: true });
  } else if (role === 'inmobiliaria') {
    user = await Inmobiliaria.findOne({ email, RUT: identifier, active: true });
  } else {
    return res.status(400).json({ message: 'Role inválido.' });
  }

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

  user.password = newPassword;
  await user.save(); // pre-save hook hashea
  res.json({ message: 'Contraseña restablecida correctamente.' });
};

// Delete Account (soft-delete)
exports.deleteAccount = async (req, res) => {
  const user = req.user; // inyectado por middleware
  user.active = false;
  await user.save();
  res.json({ message: 'Cuenta eliminada correctamente.' });
};
