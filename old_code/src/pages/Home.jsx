import React, { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';

const Home = () => {
  const [kwanat, setKwanat] = useState([]);

  useEffect(() => {
    const fetchKwanat = async () => {
      try {
        const response = await fetch('http://localhost:5000/kwanat');
        const data = await response.json();
        setKwanat(data);
      } catch (error) {
        console.error('Error fetching Kwanat:', error);
      }
    };

    fetchKwanat();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-blue-100 p-6 rounded-lg text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Discover Hidden Gems</h1>
        <p className="text-lg text-gray-700">Explore and share the best spots around you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kwanat.map((item) => (
          <Card key={item.id} title={item.title} description={item.description} image={item.mediaPath} />
        ))}
      </div>
    </div>
  );
};

export default Home;