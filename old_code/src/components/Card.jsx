import React from 'react';

const Card = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default Card;