const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

exports.register = async (req, res) => {
  const {
    nombre,
    email,
    password,
    telefono,
    direccion,
    ciudad,
    departamento,
    tipo_usuario
  } = req.body;

  // Validaciones básicas
  if (await User.findOne({ email }))
    return res.status(400).json({ message: 'Email ya registrado' });

  // Creamos el usuario con TODOS los campos requeridos
  const user = await User.create({
    nombre,
    email,
    password,
    telefono,
    direccion,
    ciudad,
    departamento,
    tipo_usuario
  });

  res.status(201).json({
    user: {
      id:             user._id,
      nombre:         user.nombre,
      email:          user.email,
      telefono:       user.telefono,
      direccion:      user.direccion,
      ciudad:         user.ciudad,
      departamento:   user.departamento,
      tipo_usuario:   user.tipo_usuario,
      fecha_registro: user.fecha_registro
    },
    token: generateToken(user._id),
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Credenciales inválidas' });

  // Actualizar último login
  user.lastLogin = Date.now();
  await user.save();

  res.json({
    user: {
      id:         user._id,
      name:       user.name,
      email:      user.email,
      role:       user.role,
      cedula:     user.cedula,
      createdAt:  user.createdAt,
      lastLogin:  user.lastLogin,
    },
    token: generateToken(user._id),
  });
};

// ➕ Obtener datos de la cuenta (perfil)
exports.getMe = async (req, res) => {
  const u = req.user;
  res.json({
    id:         u._id,
    name:       u.name,
    email:      u.email,
    role:       u.role,
    cedula:     u.cedula,
    createdAt:  u.createdAt,
    lastLogin:  u.lastLogin,
  });
};

// ➕ Eliminar la propia cuenta
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: 'Cuenta eliminada correctamente' });
};
