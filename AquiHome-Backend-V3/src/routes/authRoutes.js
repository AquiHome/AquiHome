const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Login usuario
router.post('/login-user', authController.loginUser);

// Login proveedor
router.post('/login-provider', authController.loginProvider);

module.exports = router;
