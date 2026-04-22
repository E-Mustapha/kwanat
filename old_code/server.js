import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
let db;
(async () => {
  db = await open({
    filename: './kwanat.db',
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
app.get('/kwanat', async (req, res) => {
  try {
    const kwanat = await db.all('SELECT * FROM Kwanat');
    res.json(kwanat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Kwanat' });
  }
});

app.post('/kwanat', async (req, res) => {
  const { title, description, mediaPath, latitude, longitude } = req.body;
  try {
    const result = await db.run(
      'INSERT INTO Kwanat (title, description, mediaPath, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      [title, description, mediaPath, latitude, longitude]
    );
    res.json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add Kwan' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});