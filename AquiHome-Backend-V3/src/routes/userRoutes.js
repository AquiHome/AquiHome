const express = require('express');
const userController = require('../controllers/userController');
const { authUser } = require('../middleware/auth');
const router = express.Router();

// === ENDPOINTS FAVORITOS (van antes de /:id) ===

// Agregar propiedad a favoritos
router.post('/favorites/:propertyId', authUser, async (req, res) => {
  const { propertyId } = req.params;
  if (!req.user.favoriteProperties.includes(propertyId)) {
    req.user.favoriteProperties.push(propertyId);
    await req.user.save();
  }
  res.json({ favorites: req.user.favoriteProperties });
});

// Quitar propiedad de favoritos
router.delete('/favorites/:propertyId', authUser, async (req, res) => {
  const { propertyId } = req.params;
  req.user.favoriteProperties = req.user.favoriteProperties.filter(
    id => id.toString() !== propertyId
  );
  await req.user.save();
  res.json({ favorites: req.user.favoriteProperties });
});

// Listar mis favoritos
router.get('/favorites', authUser, async (req, res) => {
  await req.user.populate('favoriteProperties');
  res.json(req.user.favoriteProperties);
});

// === ENDPOINTS PROTEGIDOS ===

// Obtener mis datos (requiere token)
router.get('/me', authUser, (req, res) => {
  res.json(req.user);
});

// Eliminar mi cuenta (requiere token)
router.delete('/me', authUser, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'Cuenta eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando cuenta' });
  }
});

// === ENDPOINTS CRUD ADMIN/PÚBLICO ===

// Crear usuario
router.post('/', userController.createUser);

// Listar todos los usuarios
router.get('/', userController.getUsers);

// Buscar usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar usuario por ID
router.put('/:id', userController.updateUser);

// Eliminar usuario por ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
