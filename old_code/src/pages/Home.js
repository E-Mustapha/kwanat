import React from 'react';
import Card from '../components/Card';

const Home = () => {
  const dummyData = [
    { id: 1, title: 'Cozy Café', description: 'A great place to relax.', image: '/path/to/image1.jpg' },
    { id: 2, title: 'Hidden Beach', description: 'A serene beach with clear water.', image: '/path/to/image2.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dummyData.map((item) => (
        <Card key={item.id} title={item.title} description={item.description} image={item.image} />
      ))}
    </div>
  );
};

export default Home;