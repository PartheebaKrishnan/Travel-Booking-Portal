import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD;

if (!dbPassword) {
  console.warn(
    'Warning: DB_PASSWORD is not set. If your MySQL user requires a password, the connection will fail.'
  );
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: dbUser,
  password: dbPassword || 'P@rthee123',
  database: process.env.DB_NAME || 'travel_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
