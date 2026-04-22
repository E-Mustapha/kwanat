import { useEffect, useState } from 'react';
import { initializeDatabase, getAllKwanat, addKwan } from '../services/databaseService';

const useSQLite = () => {
  const [kwanat, setKwanat] = useState([]);

  useEffect(() => {
    const initDB = async () => {
      await initializeDatabase();
      const data = getAllKwanat();
      setKwanat(data);
    };
    initDB();
  }, []);

  const addNewKwan = (kwan) => {
    addKwan(kwan);
    setKwanat(getAllKwanat());
  };

  return { kwanat, addNewKwan };
};

export default useSQLite;