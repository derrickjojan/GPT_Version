const express = require('express');
const {
  getAllUsers,
  getAllDrivers,
  approveDriver,
  getLiveBookings,
  updatePricingRules,
  getAnalytics
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/users', protect(['admin']), getAllUsers);
router.get('/drivers', protect(['admin']), getAllDrivers);
router.patch('/drivers/:driverId/approve', protect(['admin']), approveDriver);
router.get('/bookings/live', protect(['admin']), getLiveBookings);
router.patch('/pricing-rules', protect(['admin']), updatePricingRules);
router.get('/analytics', protect(['admin']), getAnalytics);

module.exports = router;
