// controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Property = require('../models/Property');

exports.createTransaction = async (req, res) => {
  const { propertyId, type } = req.body; // type = 'venta' | 'alquiler'
  const clientId = req.user._id;

  // 1. Crear transacción
  const tx = new Transaction({
    property: propertyId,
    client: clientId,
    type
  });
  await tx.save();

  // 2. Marcar propiedad vendida/rentada
  await Property.findByIdAndUpdate(propertyId, {
    status: type === 'venta' ? 'vendida' : 'rentada'
  });

  res.status(201).json(tx);
};
