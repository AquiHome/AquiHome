const express = require('express');
const controller = require('../controllers/transactionController');
const { authUser, authProvider } = require('../middleware/auth');
const router = express.Router();

// === ADMIN ===
router.get('/admin', controller.adminList);
router.get('/admin/:id', controller.adminGetById);
router.put('/admin/:id', controller.adminUpdate);
router.delete('/admin/:id', controller.adminDelete);

// === USUARIO & PROVEEDOR ===
// Crear transacción
router.post('/', authUser, controller.create);
router.post('/', authProvider, controller.create);

// Confirmar transacción
router.post('/:id/confirm', authUser, controller.confirm);
router.post('/:id/confirm', authProvider, controller.confirm);

// Cancelar transacción
router.post('/:id/cancel', authUser, controller.cancel);
router.post('/:id/cancel', authProvider, controller.cancel);

// Listar mis transacciones
router.get('/my', authUser, controller.listMy);
router.get('/my', authProvider, controller.listMy);

// Ver una transacción propia
router.get('/my/:id', authUser, controller.getMineById);
router.get('/my/:id', authProvider, controller.getMineById);

module.exports = router;
