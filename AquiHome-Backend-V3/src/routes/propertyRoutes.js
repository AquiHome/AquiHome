const express = require('express');
const propertyController = require('../controllers/propertyController');
const { authProvider } = require('../middleware/auth');
const router = express.Router();

// ================== PROVEEDOR (estas van PRIMERO) ==================
router.post('/my', authProvider, propertyController.providerCreate);        // Crear propiedad (proveedor)
router.get('/my', authProvider, propertyController.providerListMine);       // Ver mis propiedades (proveedor)
router.put('/my/:id', authProvider, propertyController.providerUpdate);     // Modificar mi propiedad
router.delete('/my/:id', authProvider, propertyController.providerDelete);  // Eliminar mi propiedad

// ================== ADMIN (CRUD COMPLETO) ==================
router.get('/admin', propertyController.adminGetAll);
router.post('/admin', propertyController.adminCreate);
router.get('/admin/:id', propertyController.adminGetById);
router.put('/admin/:id', propertyController.adminUpdate);
router.delete('/admin/:id', propertyController.adminDelete);

// ================== PÚBLICO (ver propiedades activas) ==================
router.get('/', propertyController.getAllActive);           // Listar propiedades activas
router.get('/:id', propertyController.getActiveById);       // Ver propiedad activa por ID

module.exports = router;
