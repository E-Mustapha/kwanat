import initSqlJs from 'sql.js';

let db = null;

export const initializeDatabase = async () => {
  if (!db) {
    const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
    db = new SQL.Database();

    // Create the Kwanat table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS Kwanat (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      mediaPath TEXT,
      latitude REAL,
      longitude REAL
    );`);
  }
};

export const getAllKwanat = () => {
  if (!db) throw new Error('Database not initialized');

  const result = db.exec('SELECT * FROM Kwanat');
  return result[0]?.values || [];
};

export const addKwan = ({ title, description, mediaPath, latitude, longitude }) => {
  if (!db) throw new Error('Database not initialized');

  const stmt = db.prepare(`INSERT INTO Kwanat (title, description, mediaPath, latitude, longitude) VALUES (?, ?, ?, ?, ?)`);
  stmt.run([title, description, mediaPath, latitude, longitude]);
  stmt.free();
};