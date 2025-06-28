// controllers/authController.js
const User = require('../models/User');
const Cliente = require('../models/Cliente');
const Inmobiliaria = require('../models/Inmobiliaria');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  const { role, ...userData } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    let newUser;
    if (role === 'Cliente') {
      newUser = new Cliente(userData);
    } else if (role === 'Inmobiliaria') {
      newUser = new Inmobiliaria(userData);
    } else {
      return res.status(400).json({ message: 'Rol inválido' });
    }

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, isActive: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await User.findByIdAndUpdate(userId, { isActive: false });
    res.json({ message: 'Cuenta desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar cuenta', error });
  }
};
