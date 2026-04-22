import React, { useState } from 'react';

const Card = ({ title, description, images }) => {
  // Safely parse image string to array
  let newImages = [];
  try {
    newImages = typeof images === 'string' ? JSON.parse(images) : images;
  } catch (e) {
    console.error('Invalid image format:', images);
  }

  const [current, setCurrent] = useState(0);
  const baseUrl = 'http://localhost:5000/api/images/';

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? newImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === newImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="rounded-lg shadow-md p-4">
      <div className="relative w-full h-70 overflow-hidden rounded-t-lg">
        {newImages.length > 0 && (
          <img
            src={baseUrl + newImages[current]}
            alt={`${title} ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        )}

        {newImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-blue-500 text-black rounded-full px-2 p-1 shadow cursor-pointer"
            >
              ◀
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-blue-500 text-black rounded-full px-2 p-1 shadow cursor-pointer"
            >
              ▶
            </button>
          </>
        )}
      </div>

      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default Card;
