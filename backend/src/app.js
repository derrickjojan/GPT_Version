const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const driverRoutes = require('./routes/driverRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'SwiftHaul API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
