// services/pointsService.js
exports.assignWelcomePoints = async (user) => {
  user.puntos = 100; // ejemplo
  await user.save();
};

exports.calculatePointsForTransaction = async (user, type) => {
  const mult = type === 'venta' ? 3 : 2;
  user.puntos = (user.puntos || 0) * mult;
  await user.save();
};
