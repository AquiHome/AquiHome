const express = require('express');
const providerController = require('../controllers/providerController');
const { authProvider } = require('../middleware/auth');
const router = express.Router();

// === ENDPOINTS PROTEGIDOS ===

// Obtener mis datos (requiere token)
router.get('/me', authProvider, (req, res) => {
  res.json(req.provider);
});

// Eliminar mi cuenta (requiere token)
router.delete('/me', authProvider, async (req, res) => {
  try {
    await req.provider.deleteOne();
    res.json({ message: 'Cuenta de proveedor eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando cuenta' });
  }
});

// === ENDPOINTS CRUD ADMIN/PÚBLICO ===

// Crear proveedor
router.post('/', providerController.createProvider);

// Listar todos los proveedores
router.get('/', providerController.getProviders);

// Buscar proveedor por ID
router.get('/:id', providerController.getProviderById);

// Actualizar proveedor por ID
router.put('/:id', providerController.updateProvider);

// Eliminar proveedor por ID
router.delete('/:id', providerController.deleteProvider);

module.exports = router;
