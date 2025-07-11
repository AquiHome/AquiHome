const express = require('express');
const router  = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const controller = require('../controllers/transactionController');

// 🏢 Crear transacción
router.post(
  '/',
  protect,
  restrictTo('inmobiliaria'),
  controller.createTransaction
);

// 👤 Ver transacciones pendientes
router.get(
  '/pending',
  protect,
  controller.getPendingTransactions
);

// 👤 Ver todas mis transacciones
router.get('/mine', protect, controller.getMyTransactions);

// 👤 Confirmar transacción
router.patch('/:id/confirm', protect, controller.confirmTransaction);

module.exports = router;
