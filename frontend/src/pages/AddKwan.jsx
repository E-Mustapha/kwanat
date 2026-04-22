import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';
import MediaUploader from '../components/MediaUploader.jsx';
import MapPicker from '../components/MapPicker.jsx';
import { useNavigate } from 'react-router-dom';

const AddKwan = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: [],
    location: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaUpload = (files) => {
    setFormData({ ...formData, media: files });
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formData.media.forEach((file) => {
      formDataToSend.append('media', file);
    });
    if (formData.location) {
      formDataToSend.append('latitude', formData.location.lat);
      formDataToSend.append('longitude', formData.location.lng);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/kwanat', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add Kwan');
      }
  
      setMessage('Kwan added successfully!');
      navigate('/'); // ✅ Correct way to redirect in React Router
    } catch (error) {
      console.error('Error adding Kwan:', error);
      setMessage('Failed to add Kwan. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add a New Kwan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the title"
            name="title"
          />
          <FormField
            label="Description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter the description"
            name="description"
          />
          <MediaUploader onUpload={handleMediaUpload} multiple />
          <MapPicker onLocationSelect={handleLocationSelect} className="w-full h-64 rounded-lg overflow-hidden" />
          <button type="submit" className="cursor-pointer hover:bg-blue-800 px-4 py-2 bg-blue-500 text-white rounded-lg w-full">
            Submit
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <img
          src={'http://localhost:5000/api/images/hero-img.png'}
          alt="Add Kwan Illustration"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AddKwan;