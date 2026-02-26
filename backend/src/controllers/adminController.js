const { users, drivers } = require('./authController');
const { bookings } = require('./bookingController');
const { pricingByVehicle } = require('../utils/fareCalculator');

const pricingRules = {
  surgeMultiplier: Number(process.env.SURGE_MULTIPLIER || 1),
  driverCommissionPercent: Number(process.env.DRIVER_COMMISSION_PERCENT || 80),
  vehiclePricing: pricingByVehicle
};

const getAllUsers = (_req, res) => res.status(200).json(users);
const getAllDrivers = (_req, res) => res.status(200).json(drivers);
const getLiveBookings = (_req, res) => res.status(200).json(bookings);

const approveDriver = (req, res) => {
  const driver = drivers.find((item) => item.id === Number(req.params.driverId));

  if (!driver) {
    res.status(404);
    throw new Error('Driver not found');
  }

  driver.isApproved = true;
  return res.status(200).json({ message: 'Driver approved', driver });
};

const updatePricingRules = (req, res) => {
  const { surgeMultiplier, driverCommissionPercent } = req.body;

  if (surgeMultiplier) {
    pricingRules.surgeMultiplier = Number(surgeMultiplier);
  }

  if (driverCommissionPercent) {
    pricingRules.driverCommissionPercent = Number(driverCommissionPercent);
  }

  return res.status(200).json({ message: 'Pricing rules updated', pricingRules });
};

const getAnalytics = (_req, res) => {
  const completedTrips = bookings.filter((booking) => booking.status === 'completed');
  const cancelledTrips = bookings.filter((booking) => booking.status === 'cancelled');
  const activeDrivers = drivers.filter((driver) => driver.isOnline).length;

  const totalRevenue = completedTrips.reduce((sum, booking) => sum + booking.fare.platformFee, 0);
  const cancellationRate = bookings.length ? (cancelledTrips.length / bookings.length) * 100 : 0;

  return res.status(200).json({
    totalRevenue,
    activeDrivers,
    completedTrips: completedTrips.length,
    cancellationRate: Number(cancellationRate.toFixed(2))
  });
};

module.exports = {
  getAllUsers,
  getAllDrivers,
  approveDriver,
  getLiveBookings,
  updatePricingRules,
  getAnalytics
};
