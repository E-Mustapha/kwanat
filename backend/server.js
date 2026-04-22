import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import kwanRoutes from './routes/kwanatRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
let db;
(async () => {
  db = await open({
    filename: './database/kwanat.db',
    driver: sqlite3.Database,
  });

  await db.exec(`CREATE TABLE IF NOT EXISTS Kwanat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    mediaPath TEXT,
    latitude REAL,
    longitude REAL
  );`);
})();

// Routes
app.use('/api', kwanRoutes);
// Serve images via controller
app.use('/api', imageRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});