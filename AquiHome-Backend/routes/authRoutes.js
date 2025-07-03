// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, resetPassword, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login',    login);
router.post('/reset-password', resetPassword);
router.delete('/me', protect, deleteAccount);

module.exports = router;
