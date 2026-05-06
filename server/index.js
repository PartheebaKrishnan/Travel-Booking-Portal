import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import packagesRouter from './routes/packages.js';
import destinationsRouter from './routes/destinations.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'travel-booking-backend' });
});

app.use('/api/packages', packagesRouter);
app.use('/api/destinations', destinationsRouter);
app.use('/api/bookings', bookingsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Travel app backend running on http://localhost:${PORT}`);
});
