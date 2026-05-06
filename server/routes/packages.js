import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { theme, search } = req.query;
    let sql = 'SELECT * FROM packages';
    const params = [];
    const conditions = [];

    if (theme && theme !== 'All') {
      conditions.push('theme = ?');
      params.push(theme);
    }

    if (search) {
      const searchTerm = `%${search}%`;
      conditions.push('(title LIKE ? OR location LIKE ? OR highlight LIKE ?)');
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM packages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
