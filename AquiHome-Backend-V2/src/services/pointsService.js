// services/pointsService.js

exports.calcularPuntosPorTransaccion = (precio) => {
  const porcentaje = 0.015; // 1.5%
  const puntosPorDolar = 100;
  const base = precio * porcentaje;
  return Math.floor(base * puntosPorDolar);
};
