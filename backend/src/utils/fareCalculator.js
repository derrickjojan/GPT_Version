const pricingByVehicle = {
  bike: { baseFare: 40, perKm: 10 },
  tempo: { baseFare: 80, perKm: 16 },
  mini_truck: { baseFare: 130, perKm: 22 },
  large_truck: { baseFare: 250, perKm: 38 }
};

/**
 * Calculates fare and driver payout using a transparent formula:
 * total = (baseFare + distanceKm * perKm) * surgeMultiplier
 */
const calculateFare = ({ vehicleType, distanceKm, surgeMultiplier = 1, driverCommissionPercent = 80 }) => {
  const priceConfig = pricingByVehicle[vehicleType];

  if (!priceConfig) {
    throw new Error('Unsupported vehicle type');
  }

  const subtotal = priceConfig.baseFare + distanceKm * priceConfig.perKm;
  const totalFare = Number((subtotal * surgeMultiplier).toFixed(2));
  const driverPayout = Number((totalFare * (driverCommissionPercent / 100)).toFixed(2));
  const platformFee = Number((totalFare - driverPayout).toFixed(2));

  return {
    ...priceConfig,
    distanceKm,
    surgeMultiplier,
    totalFare,
    driverPayout,
    platformFee
  };
};

module.exports = { calculateFare, pricingByVehicle };
