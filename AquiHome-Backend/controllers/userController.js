// controllers/userController.js
const User = require('../models/User');

// Listar todos los usuarios (admin view)
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Crear usuario genérico (si lo necesitas)
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};
