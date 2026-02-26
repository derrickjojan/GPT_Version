const express = require('express');
const {
  estimateFare,
  createBooking,
  getCustomerBookings,
  cancelBooking,
  rateDriver
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/estimate-fare', protect(['customer']), estimateFare);
router.post('/', protect(['customer']), createBooking);
router.get('/me', protect(['customer']), getCustomerBookings);
router.patch('/:bookingId/cancel', protect(['customer']), cancelBooking);
router.patch('/:bookingId/rate-driver', protect(['customer']), rateDriver);

module.exports = router;
