const express = require('express');
const {
  register,
  login,
  getMe,
  deleteMe
} = require('../controllers/authController');
const { protect }         = require('../middleware/auth');

const router = express.Router();

// Registro y login existentes
router.post('/register', register);
router.post('/login',    login);

// ➕ Perfil y eliminación de cuenta
router.get(   '/me',    protect, getMe);
router.delete('/me',    protect, deleteMe);

module.exports = router;
