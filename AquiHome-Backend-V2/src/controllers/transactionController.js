const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  try {
    const { cliente_id, property_id } = req.body;
    const inmobiliaria_id = req.user._id;

    // Validación básica de ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(cliente_id) ||
      !mongoose.Types.ObjectId.isValid(property_id)
    ) {
      return res.status(400).json({ message: 'IDs inválidos' });
    }

    const nuevaTransaccion = await Transaction.create({
      usuario_id: new mongoose.Types.ObjectId(cliente_id),
      inmueble_id: new mongoose.Types.ObjectId(property_id),
      inmobiliaria_id: new mongoose.Types.ObjectId(inmobiliaria_id),
      estado: 'pendiente',
      fecha: new Date()
    });

    res.status(201).json({ transaccion: nuevaTransaccion });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 👤 Ver transacciones pendientes (usuario)
exports.getPendingTransactions = async (req, res) => {
  try {
    const pendientes = await Transaction.find({
      usuario_id: req.user._id,
      estado: 'pendiente'
    }).populate('inmueble_id', 'titulo direccion')
      .populate('inmobiliaria_id', 'nombre email');

    res.json(pendientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyTransactions = async (req, res) => {
  try {
    if (req.user.tipo_usuario !== 'particular') {
      return res.status(403).json({ message: 'Solo los clientes pueden acceder a sus transacciones' });
    }

    const transacciones = await Transaction.find({ usuario_id: req.user._id })
      .populate('inmueble_id')
      .populate('inmobiliaria_id', 'nombre email telefono');

    res.status(200).json({ transacciones });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.confirmTransaction = async (req, res) => {
  try {
    const transaccion = await Transaction.findById(req.params.id);

    if (!transaccion) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    if (!transaccion.usuario_id.equals(req.user._id)) {
      return res.status(403).json({ message: 'No puedes confirmar esta transacción' });
    }

    transaccion.estado = 'confirmada';
    await transaccion.save();

    res.status(200).json({ message: 'Transacción confirmada', transaccion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};