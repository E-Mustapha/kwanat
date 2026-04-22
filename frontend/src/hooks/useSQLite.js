// Removed sql.js and updated the hook to use sqlite3 instead
import { useState, useEffect } from 'react';
import sqlite3 from 'sqlite3';

export const useSQLite = (dbPath) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const connectDb = () => {
      const dbInstance = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error connecting to SQLite database:', err);
        } else {
          console.log('Connected to SQLite database');
        }
      });
      setDb(dbInstance);
    };

    connectDb();

    return () => {
      if (db) {
        db.close((err) => {
          if (err) {
            console.error('Error closing SQLite database:', err);
          } else {
            console.log('SQLite database connection closed');
          }
        });
      }
    };
  }, [dbPath]);

  return db;
};