-- SwiftHaul PostgreSQL Schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  phone VARCHAR(30),
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type VARCHAR(30) NOT NULL,
  vehicle_number VARCHAR(30) NOT NULL,
  license_document_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  is_online BOOLEAN DEFAULT FALSE,
  wallet_balance NUMERIC(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pricing_rules (
  id SERIAL PRIMARY KEY,
  vehicle_type VARCHAR(30) NOT NULL,
  base_fare NUMERIC(10, 2) NOT NULL,
  per_km_rate NUMERIC(10, 2) NOT NULL,
  surge_multiplier NUMERIC(4, 2) NOT NULL DEFAULT 1,
  commission_percent NUMERIC(5, 2) NOT NULL DEFAULT 80,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES users(id),
  driver_id INT REFERENCES drivers(id),
  vehicle_type VARCHAR(30) NOT NULL,
  pickup_address TEXT NOT NULL,
  drop_address TEXT NOT NULL,
  pickup_lat NUMERIC(10, 7) NOT NULL,
  pickup_lng NUMERIC(10, 7) NOT NULL,
  drop_lat NUMERIC(10, 7) NOT NULL,
  drop_lng NUMERIC(10, 7) NOT NULL,
  distance_km NUMERIC(10, 2) NOT NULL,
  total_fare NUMERIC(10, 2) NOT NULL,
  driver_payout NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL,
  schedule_type VARCHAR(20) NOT NULL DEFAULT 'instant',
  scheduled_at TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE booking_status_logs (
  id SERIAL PRIMARY KEY,
  booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE driver_ratings (
  id SERIAL PRIMARY KEY,
  booking_id INT UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id INT REFERENCES users(id),
  driver_id INT REFERENCES drivers(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
