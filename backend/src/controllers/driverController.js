const { bookings } = require('./bookingController');
const { drivers } = require('./authController');

const setAvailability = (req, res) => {
  const { isOnline } = req.body;
  const driver = drivers.find((d) => d.id === req.user.id);

  if (!driver) {
    res.status(404);
    throw new Error('Driver not found');
  }

  driver.isOnline = Boolean(isOnline);
  return res.status(200).json({ message: 'Availability updated', isOnline: driver.isOnline });
};

const getOpenJobs = (_req, res) => {
  const openJobs = bookings.filter((booking) => booking.status === 'pending');
  return res.status(200).json(openJobs);
};

const respondToJob = (req, res) => {
  const { action } = req.body;
  const booking = bookings.find((item) => item.id === Number(req.params.bookingId));

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (action === 'accept') {
    booking.driverId = req.user.id;
    booking.status = 'accepted';
    booking.timeline.push({ status: 'accepted', timestamp: new Date().toISOString() });
  }

  if (action === 'reject') {
    booking.status = 'pending';
  }

  return res.status(200).json({ message: `Job ${action}ed`, booking });
};

const getDriverDashboard = (req, res) => {
  const myTrips = bookings.filter((booking) => booking.driverId === req.user.id);
  const completedTrips = myTrips.filter((trip) => trip.status === 'completed');
  const earnings = completedTrips.reduce((sum, trip) => sum + trip.fare.driverPayout, 0);

  return res.status(200).json({
    totalTrips: myTrips.length,
    completedTrips: completedTrips.length,
    earnings,
    walletBalance: earnings
  });
};

module.exports = {
  setAvailability,
  getOpenJobs,
  respondToJob,
  getDriverDashboard
};
