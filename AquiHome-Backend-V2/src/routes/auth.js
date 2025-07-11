const express = require('express');
const {
  register,
  login,
  getMe,
  deleteMe,
  unlockUser // ✅ agregar esto
} = require('../controllers/authController');
const { protect, restrictTo } = require('../middleware/auth'); // ✅ asegurado

const router = express.Router();

router.post('/register', register);
router.post('/login',    login);
router.get('/me',        protect, getMe);
router.delete('/me',     protect, deleteMe);

// ✅ Nuevo endpoint para admins
router.put(
  '/unlock/:userId',
  protect,
  unlockUser
);

module.exports = router;
