// src/routes/properties.js
const express = require('express');
const router  = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { protect, restrictTo } = require('../middleware/auth');

router.route('/')
  .get( getAllProperties )
  .post(
    protect,
    restrictTo('provider','inmobiliaria'),
    createProperty
  );

router.route('/:id')
  .get( getPropertyById )
  .put(
    protect,
    restrictTo('provider','inmobiliaria'),
    updateProperty
  )
  .delete(
    protect,
    restrictTo('provider','inmobiliaria'),
    deleteProperty
  );

module.exports = router;
