// routes/propertyRoutes.js
const express = require('express');
const router  = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

// 📋 Primero mi listado personal
router.get('/mine', protect, getMyProperties);

// 🌐 Luego listado público
router.get('/', getProperties);

// 📇 Después la ruta por ID
router.get('/:id', getPropertyById);

// ✏️🔨 Mutaciones (protegidas)
router.post('/',      protect, createProperty);
router.put('/:id',    protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
