import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM destinations');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

export default router;
