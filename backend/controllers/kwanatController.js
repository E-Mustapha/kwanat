import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const databasePath = path.resolve('./database/kwanat.db');

let db;
(async () => {
  db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });
})();

export const getAllKwanat = async (req, res) => {
  try {
    const kwanat = await db.all('SELECT * FROM Kwanat');
    res.json(kwanat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Kwanat' });
  }
};

export const addKwan = async (req, res) => {
  const { title, description, latitude, longitude, mediaPaths } = req.kuwanData;

  try {
    const mediaPath = JSON.stringify(mediaPaths); // store array as JSON string or handle as needed

    const result = await db.run(
      'INSERT INTO Kwanat (title, description, mediaPath, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
      [title, description, mediaPath, latitude, longitude]
    );

    res.json({ id: result.lastID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add Kwan' });
  }
};
