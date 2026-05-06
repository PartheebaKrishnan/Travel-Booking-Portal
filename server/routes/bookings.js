import express from 'express';
import Joi from 'joi';
import db from '../db.js';

const router = express.Router();

const bookingSchema = Joi.object({
  packageId: Joi.string().required(),
  travelers: Joi.number().integer().min(1).required(),
  month: Joi.string().required(),
  budget: Joi.string().required(),
  bookingMode: Joi.string().required(),
  destination: Joi.string().allow('').optional(),
  travelerName: Joi.string().min(2).required(),
  travelerEmail: Joi.string().email().required(),
  travelerPhone: Joi.string().min(7).required()
});

router.post('/', async (req, res, next) => {
  try {
    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      packageId,
      travelers,
      month,
      budget,
      bookingMode,
      destination,
      travelerName,
      travelerEmail,
      travelerPhone
    } = value;
    const [result] = await db.execute(
      'INSERT INTO bookings (package_id, travelers, month, budget, booking_mode, destination, traveler_name, traveler_email, traveler_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        packageId,
        travelers,
        month,
        budget,
        bookingMode,
        destination || null,
        travelerName,
        travelerEmail,
        travelerPhone
      ]
    );

    const [rows] = await db.query(
      'SELECT b.id, b.package_id AS packageId, b.travelers, b.month, b.budget, b.booking_mode AS bookingMode, b.destination, b.traveler_name AS travelerName, b.traveler_email AS travelerEmail, b.traveler_phone AS travelerPhone, b.created_at AS createdAt, p.title, p.location, p.price FROM bookings b JOIN packages p ON p.id = b.package_id WHERE b.id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT b.id, b.package_id AS packageId, b.travelers, b.month, b.budget, b.booking_mode AS bookingMode, b.destination, b.traveler_name AS travelerName, b.traveler_email AS travelerEmail, b.traveler_phone AS travelerPhone, b.created_at AS createdAt, p.title, p.location, p.price FROM bookings b JOIN packages p ON p.id = b.package_id ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

export default router;
