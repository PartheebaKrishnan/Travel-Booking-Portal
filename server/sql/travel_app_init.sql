CREATE DATABASE IF NOT EXISTS travel_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE travel_app;

CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR(80) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  duration VARCHAR(80) NOT NULL,
  season VARCHAR(80) NOT NULL,
  rating DECIMAL(3,2) NOT NULL,
  theme VARCHAR(80) NOT NULL,
  price INT NOT NULL,
  departure VARCHAR(80) NOT NULL,
  stay VARCHAR(255) NOT NULL,
  image VARCHAR(1024) NOT NULL,
  highlight VARCHAR(512) NOT NULL,
  perks JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(120) NOT NULL,
  country VARCHAR(120) NOT NULL,
  price VARCHAR(80) NOT NULL,
  note VARCHAR(512) NOT NULL,
  image VARCHAR(1024) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id VARCHAR(80) NOT NULL,
  travelers INT NOT NULL,
  month VARCHAR(80) NOT NULL,
  budget VARCHAR(80) NOT NULL,
  booking_mode VARCHAR(80) NOT NULL,
  destination VARCHAR(255),
  traveler_name VARCHAR(255) NOT NULL,
  traveler_email VARCHAR(255) NOT NULL,
  traveler_phone VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_package FOREIGN KEY (package_id) REFERENCES packages(id)
);

INSERT IGNORE INTO packages (id, title, location, duration, season, rating, theme, price, departure, stay, image, highlight, perks)
VALUES
('bali-retreat', 'Bali Escape + Ubud Retreat', 'Indonesia', '6 days / 5 nights', 'Best for Jun - Sep', 4.8, 'Beach', 1480, '12 Nov 2026', 'Ocean-view villa stay', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80', 'Sunrise yoga, waterfall tours, and private transfers.', JSON_ARRAY('Airport pickup', 'Daily breakfast', 'Flexible payment')),
('amalfi-coast', 'Amalfi Coast Slow Travel', 'Italy', '7 days / 6 nights', 'Best for Apr - Oct', 4.9, 'Luxury', 2190, '24 Nov 2026', 'Cliffside boutique hotel', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80', 'Private boat day, lemon groves, and sunset dining.', JSON_ARRAY('Premium stays', 'Concierge support', 'Fast-track transfers')),
('kyoto-lights', 'Kyoto Temples & Tokyo Lights', 'Japan', '8 days / 7 nights', 'Best for Mar - May', 4.7, 'Culture', 2640, '03 Dec 2026', 'Ryokan + city design hotel', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80', 'Tea ceremonies, bullet train rides, and evening food trails.', JSON_ARRAY('JR pass included', 'Guided tours', 'Couple friendly')),
('swiss-alps', 'Swiss Alps Panorama Trail', 'Switzerland', '5 days / 4 nights', 'Best for Dec - Feb', 4.9, 'Adventure', 1950, '18 Dec 2026', 'Scenic mountain chalet', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', 'Cable-car access, glacier walks, and alpine dining.', JSON_ARRAY('Trail planner', 'Gear checklist', 'Hot breakfast')),
('marrakech-canvas', 'Marrakech Medina & Desert Canvas', 'Morocco', '6 days / 5 nights', 'Best for Oct - Mar', 4.6, 'City Break', 1325, '08 Jan 2027', 'Riad + luxury desert camp', 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80', 'Souk walks, hammam evenings, and dune sunsets.', JSON_ARRAY('Local host', 'Welcome dinner', 'Photo stops')),
('zanzibar-sails', 'Zanzibar Blue Sails', 'Tanzania', '5 days / 4 nights', 'Best for Jun - Oct', 4.8, 'Beach', 1710, '20 Jan 2027', 'Sea-facing resort suite', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', 'Sailing days, spice farm tours, and reef diving.', JSON_ARRAY('Snorkeling kit', 'Resort credits', 'Spa welcome'));

INSERT IGNORE INTO destinations (city, country, price, note, image)
VALUES
('Santorini', 'Greece', 'from $1,320', 'Whitewashed stays, sea-view dinners, and easy island hopping.', 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80'),
('Cape Town', 'South Africa', 'from $1,560', 'Table Mountain mornings and coastal road trips built for groups.', 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80'),
('Reykjavik', 'Iceland', 'from $1,980', 'Northern lights, geothermal spas, and dramatic winter itineraries.', 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80');
