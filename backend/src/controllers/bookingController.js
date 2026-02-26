const { calculateFare } = require('../utils/fareCalculator');
const { calculateDistanceKm } = require('../services/locationService');
const { createPaymentIntent } = require('../services/paymentService');

const bookings = [];

const estimateFare = (req, res) => {
  const { vehicleType, pickupLat, pickupLng, dropLat, dropLng } = req.body;

  const distanceKm = calculateDistanceKm({ pickupLat, pickupLng, dropLat, dropLng });
  const fare = calculateFare({
    vehicleType,
    distanceKm,
    surgeMultiplier: Number(process.env.SURGE_MULTIPLIER || 1),
    driverCommissionPercent: Number(process.env.DRIVER_COMMISSION_PERCENT || 80)
  });

  return res.status(200).json(fare);
};

const createBooking = async (req, res) => {
  const {
    vehicleType,
    pickupAddress,
    dropAddress,
    pickupLat,
    pickupLng,
    dropLat,
    dropLng,
    scheduledAt,
    notes
  } = req.body;

  const distanceKm = calculateDistanceKm({ pickupLat, pickupLng, dropLat, dropLng });
  const fare = calculateFare({
    vehicleType,
    distanceKm,
    surgeMultiplier: Number(process.env.SURGE_MULTIPLIER || 1),
    driverCommissionPercent: Number(process.env.DRIVER_COMMISSION_PERCENT || 80)
  });

  const booking = {
    id: bookings.length + 1,
    customerId: req.user.id,
    driverId: null,
    vehicleType,
    pickupAddress,
    dropAddress,
    scheduledAt: scheduledAt || new Date().toISOString(),
    status: 'pending',
    notes,
    fare,
    createdAt: new Date().toISOString(),
    timeline: [{ status: 'pending', timestamp: new Date().toISOString() }]
  };

  const paymentIntent = await createPaymentIntent({ amount: fare.totalFare, bookingId: booking.id });
  booking.paymentIntent = paymentIntent;

  bookings.push(booking);

  return res.status(201).json(booking);
};

const getCustomerBookings = (req, res) => {
  const customerBookings = bookings.filter((booking) => booking.customerId === req.user.id);
  return res.status(200).json(customerBookings);
};

const cancelBooking = (req, res) => {
  const booking = bookings.find((item) => item.id === Number(req.params.bookingId));
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.customerId !== req.user.id) {
    res.status(403);
    throw new Error('Cannot cancel another user booking');
  }

  booking.status = 'cancelled';
  booking.timeline.push({ status: 'cancelled', timestamp: new Date().toISOString() });

  return res.status(200).json({ message: 'Booking cancelled', booking });
};

const rateDriver = (req, res) => {
  const { rating, review } = req.body;
  const booking = bookings.find((item) => item.id === Number(req.params.bookingId));

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.customerId !== req.user.id) {
    res.status(403);
    throw new Error('Cannot rate another user booking');
  }

  booking.rating = { rating, review };
  return res.status(200).json({ message: 'Driver rated successfully', booking });
};

module.exports = {
  estimateFare,
  createBooking,
  getCustomerBookings,
  cancelBooking,
  rateDriver,
  bookings
};
