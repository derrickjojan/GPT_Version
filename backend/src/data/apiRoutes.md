# REST API Routes

## Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/driver/register`

## Customer Bookings
- `POST /api/bookings/estimate-fare`
- `POST /api/bookings`
- `GET /api/bookings/me`
- `PATCH /api/bookings/:bookingId/cancel`
- `PATCH /api/bookings/:bookingId/rate-driver`

## Driver
- `PATCH /api/drivers/availability`
- `GET /api/drivers/jobs/open`
- `PATCH /api/drivers/jobs/:bookingId/respond`
- `GET /api/drivers/dashboard`

## Admin
- `GET /api/admin/users`
- `GET /api/admin/drivers`
- `PATCH /api/admin/drivers/:driverId/approve`
- `GET /api/admin/bookings/live`
- `PATCH /api/admin/pricing-rules`
- `GET /api/admin/analytics`
