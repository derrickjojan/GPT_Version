INSERT INTO users (name, email, phone, password_hash, role)
VALUES
('Aarav Mehta', 'aarav@swifthaul.com', '+919900001111', 'hashed_password_1', 'customer'),
('Isha Patel', 'isha@swifthaul.com', '+919900002222', 'hashed_password_2', 'customer'),
('Admin SwiftHaul', 'admin@swifthaul.com', '+919900009999', 'hashed_password_3', 'admin');

INSERT INTO drivers (user_id, vehicle_type, vehicle_number, license_document_url, is_approved, is_online, wallet_balance)
VALUES
(1, 'mini_truck', 'MH12AB1234', 'https://example.com/license-1.png', TRUE, TRUE, 1250.50),
(2, 'tempo', 'MH14CD5678', 'https://example.com/license-2.png', TRUE, FALSE, 860.00);

INSERT INTO pricing_rules (vehicle_type, base_fare, per_km_rate, surge_multiplier, commission_percent)
VALUES
('bike', 40, 10, 1.0, 80),
('tempo', 80, 16, 1.0, 80),
('mini_truck', 130, 22, 1.0, 80),
('large_truck', 250, 38, 1.1, 78);
