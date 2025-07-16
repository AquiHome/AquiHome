const Transaction = require('../models/transaction');
const Property = require('../models/property');

// ====== ADMIN ======

exports.adminList = async (req, res) => {
  const txs = await Transaction.find().populate('property provider customer');
  res.json(txs);
};

exports.adminGetById = async (req, res) => {
  const tx = await Transaction.findById(req.params.id).populate('property provider customer');
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });
  res.json(tx);
};

exports.adminUpdate = async (req, res) => {
  const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });
  res.json(tx);
};

exports.adminDelete = async (req, res) => {
  const tx = await Transaction.findByIdAndDelete(req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });
  res.json({ message: 'Transacción eliminada' });
};

// ====== USUARIO y PROVEEDOR: Iniciar, Confirmar, Ver mis transacciones ======

// Iniciar transacción (user o provider)
exports.create = async (req, res) => {
  const { property } = req.body;

  // Buscar el property y obtener el otro actor
  const prop = await Property.findById(property);
  if (!prop) return res.status(404).json({ error: 'Propiedad no encontrada' });

  let provider, customer, initiatorType;
  if (req.user) {
    customer = req.user._id;
    provider = prop.provider;
    initiatorType = 'customer';
  } else if (req.provider) {
    provider = req.provider._id;
    customer = req.body.customer; // Debes enviar el customer si inicia el provider
    if (!customer) return res.status(400).json({ error: 'Falta customer' });
    initiatorType = 'provider';
  } else {
    return res.status(403).json({ error: 'No autorizado' });
  }

  const exists = await Transaction.findOne({ property, provider, customer, status: { $ne: 'cancelled' } });
  if (exists) return res.status(409).json({ error: 'Ya existe una transacción abierta para este usuario/proveedor en esa propiedad.' });

  const tx = new Transaction({ property, provider, customer });
  await tx.save();
  res.status(201).json(tx);
};

exports.confirm = async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });

  let wasConfirmed = tx.status === 'confirmed';

  if (req.user && tx.customer.equals(req.user._id)) {
    tx.customerConfirmed = true;
  } else if (req.provider && tx.provider.equals(req.provider._id)) {
    tx.providerConfirmed = true;
  } else {
    return res.status(403).json({ error: 'No autorizado' });
  }

  tx.tryConfirm();

  // Solo sumar puntos si acaba de pasar a confirmed
  if (tx.status === 'confirmed' && !wasConfirmed) {
    // Buscamos property y user (cliente)
    const property = await Property.findById(tx.property);
    const user = await User.findById(tx.customer);
    if (property && user) {
      let puntos = 0;
      if (property.operation === 'venta') {
        puntos = property.price * 0.015;
      } else if (property.operation === 'alquiler') {
        puntos = property.price * 0.40;
      }
      user.points = (user.points || 0) + Math.round(puntos);
      await user.save();
    }
  }

  await tx.save();
  res.json(tx);
};


// Cancelar transacción (user/provider/admin)
exports.cancel = async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });

  if (req.user && tx.customer.equals(req.user._id)) {
    tx.status = 'cancelled';
    tx.cancelledBy = 'customer';
  } else if (req.provider && tx.provider.equals(req.provider._id)) {
    tx.status = 'cancelled';
    tx.cancelledBy = 'provider';
  } else if (req.admin) {
    tx.status = 'cancelled';
    tx.cancelledBy = 'admin';
  } else {
    return res.status(403).json({ error: 'No autorizado' });
  }

  await tx.save();
  res.json({ message: 'Transacción cancelada', tx });
};

// Ver mis transacciones (user/provider)
exports.listMy = async (req, res) => {
  let filter = {};
  if (req.user) filter.customer = req.user._id;
  else if (req.provider) filter.provider = req.provider._id;
  else return res.status(403).json({ error: 'No autorizado' });

  const txs = await Transaction.find(filter).populate('property provider customer');
  res.json(txs);
};

// Ver una transacción (solo actores)
exports.getMineById = async (req, res) => {
  const tx = await Transaction.findById(req.params.id).populate('property provider customer');
  if (!tx) return res.status(404).json({ error: 'Transacción no encontrada' });

  if (
    (req.user && tx.customer.equals(req.user._id)) ||
    (req.provider && tx.provider.equals(req.provider._id))
  ) {
    return res.json(tx);
  }
  return res.status(403).json({ error: 'No autorizado' });
};
