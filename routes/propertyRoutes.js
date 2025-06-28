// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createProperty);
router.get('/',        getProperties);
router.get('/:id',     getPropertyById);
router.put('/:id',     protect, updateProperty);
router.delete('/:id',  protect, deleteProperty);

module.exports = router;
