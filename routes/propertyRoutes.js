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

router.get('/mine', protect, getMyProperties);

router.get('/', getProperties);

router.get('/:id', getPropertyById);

router.post('/',      protect, createProperty);
router.put('/:id',    protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

module.exports = router;
