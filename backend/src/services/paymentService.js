/**
 * Mock payment intent similar to Stripe response shape.
 */
const createPaymentIntent = async ({ amount, currency = 'INR', bookingId }) => ({
  id: `pi_${Date.now()}`,
  bookingId,
  amount,
  currency,
  status: 'requires_payment_method',
  clientSecret: `mock_secret_${Date.now()}`
});

module.exports = { createPaymentIntent };
