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

  if (!user)
    return res.status(401).json({ message: 'Credenciales inválidas' });

  if (user.isLockedAccount)
    return res.status(403).json({ message: 'Cuenta bloqueada por múltiples intentos fallidos. Contacta soporte.' });

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    user.loginAttempts += 1;

    if (user.loginAttempts >= 3) {
      user.isLockedAccount = true;
    }

    await user.save();

    return res.status(401).json({
      message: user.isLockedAccount 
        ? 'Cuenta bloqueada tras múltiples intentos fallidos.'
        : 'Contraseña incorrecta'
    });
  }

  // ✅ Login exitoso → resetea intentos
  user.loginAttempts = 0;
  user.lastLogin = Date.now();
  await user.save();

  res.json({
    user: {
      id:             user._id,
      nombre:         user.nombre,
      email:          user.email,
      tipo_usuario:   user.tipo_usuario,
      fecha_registro: user.fecha_registro,
      lastLogin:      user.lastLogin
    },
    token: generateToken(user._id)
  });
};


// ➕ Obtener datos de la cuenta (perfil)
exports.getMe = async (req, res) => {
  const u = req.user;
  res.json({
    id:             u._id,
    nombre:         u.nombre,
    email:          u.email,
    telefono:       u.telefono,
    direccion:      u.direccion,
    ciudad:         u.ciudad,
    departamento:   u.departamento,
    tipo_usuario:   u.tipo_usuario,
    fecha_registro: u.fecha_registro,
    updatedAt:      u.updatedAt
  });
};

// ➕ Eliminar la propia cuenta
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: 'Cuenta eliminada correctamente' });
};

// 🔓 Desbloquear cuenta manualmente (admin)
exports.unlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    user.isLockedAccount = false;
    user.loginAttempts = 0;
    await user.save();

    res.json({ message: '✅ Cuenta desbloqueada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
