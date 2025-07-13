// src/routes/properties.js
const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/propertyController');
const { protect, restrictTo } = require('../middleware/auth');

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties // 🆕 agregamos la función de búsqueda
} = propertyController;

router.get('/search', searchProperties); // 🆕 búsqueda por texto estilo elastic

router.route('/')
  .get(getAllProperties)
  .post(
    protect,
    restrictTo('provider', 'inmobiliaria'),
    createProperty
  );

router.route('/:id')
  .get(getPropertyById)
  .put(
    protect,
    restrictTo('provider', 'inmobiliaria'),
    updateProperty
  )
  .delete(
    protect,
    restrictTo('provider', 'inmobiliaria'),
    deleteProperty
  );

module.exports = router;
