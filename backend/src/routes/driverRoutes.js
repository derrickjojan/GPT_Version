const express = require('express');
const {
  setAvailability,
  getOpenJobs,
  respondToJob,
  getDriverDashboard
} = require('../controllers/driverController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.patch('/availability', protect(['driver']), setAvailability);
router.get('/jobs/open', protect(['driver']), getOpenJobs);
router.patch('/jobs/:bookingId/respond', protect(['driver']), respondToJob);
router.get('/dashboard', protect(['driver']), getDriverDashboard);

module.exports = router;
