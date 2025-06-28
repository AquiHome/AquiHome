// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createTransaction);

module.exports = router;
