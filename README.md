# SwiftHaul - On-demand Logistics Platform

SwiftHaul is an original full-stack web application for local goods transportation. It includes a **customer booking flow**, **driver partner workflow**, and an **admin operations dashboard**.

## Tech Stack
- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Node.js + Express (REST API)
- **Auth:** JWT
- **Database:** PostgreSQL

## Product Modules
### 1) Customer Panel
- JWT signup/login
- Book goods vehicle (bike, tempo, mini truck, large truck)
- Pickup + drop address and coordinates
- Live fare estimation (distance-based + surge)
- Instant or scheduled delivery
- Payment placeholder (Stripe-style mock payment intent)
- Booking history
- Cancel booking
- Rate driver

### 2) Driver Partner Panel
- Driver registration with vehicle details + license upload placeholder
- Driver login
- Job accept/reject
- Online/offline toggle
- Earnings + wallet dashboard
- Trip history

### 3) Admin Dashboard
- View users/drivers
- Approve driver registrations
- View live bookings
- Manage pricing rules
- Analytics: total revenue, active drivers, completed trips, cancellation rate

## Folder Structure
```text
.
├── backend
│   ├── package.json
│   └── src
│       ├── app.js
│       ├── server.js
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── data/apiRoutes.md
│       └── db/{schema.sql,seed.sql}
└── frontend
    ├── package.json
    ├── index.html
    ├── tailwind.config.js
    └── src
        ├── App.jsx
        ├── components/
        ├── pages/
        ├── services/
        ├── context/
        └── styles/
```

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## PostgreSQL Setup
1. Create DB:
```sql
CREATE DATABASE swifthaul;
```
2. Apply schema:
```bash
psql -d swifthaul -f backend/src/db/schema.sql
```
3. Seed sample data:
```bash
psql -d swifthaul -f backend/src/db/seed.sql
```

## Business Logic
### Fare Formula
`total_fare = (base_fare + distance_km * per_km_rate) * surge_multiplier`

### Driver Commission
`driver_payout = total_fare * (commission_percent / 100)`

### Platform Fee
`platform_fee = total_fare - driver_payout`

## API Index
Route list is available in: `backend/src/data/apiRoutes.md`

## Environment Variables
Backend `.env` values:
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `SURGE_MULTIPLIER`
- `DRIVER_COMMISSION_PERCENT`

Frontend optional:
- `VITE_API_BASE_URL`

## Deployment Steps
### Backend (Render/Railway/Fly)
1. Push repository to Git provider.
2. Configure managed Postgres.
3. Set backend env vars.
4. Start command: `npm start` from `backend`.
5. Run SQL migration using `schema.sql` and `seed.sql`.

### Frontend (Vercel/Netlify)
1. Import repository.
2. Build command: `npm run build` in `frontend`.
3. Output dir: `dist`.
4. Set `VITE_API_BASE_URL` to deployed backend URL.

## Notes
- Controllers currently use in-memory arrays for demo runtime speed; replace with repository functions using `pg` for production persistence.
- `schema.sql` provides complete relational design for production-grade migration.
