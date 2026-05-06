USE travel_app;

ALTER TABLE bookings
  ADD COLUMN traveler_name VARCHAR(255) NOT NULL AFTER destination,
  ADD COLUMN traveler_email VARCHAR(255) NOT NULL AFTER traveler_name,
  ADD COLUMN traveler_phone VARCHAR(80) NOT NULL AFTER traveler_email;
