import React, { useState } from 'react';
import FormField from '../components/FormField.jsx';
import MediaUploader from '../components/MediaUploader.jsx';
import MapPicker from '../components/MapPicker.jsx';
import { uploadMedia } from '../components/api';
import { addKwan } from '../services/databaseService';

const AddKwan = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    media: null,
    location: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMediaUpload = (file) => {
    setFormData({ ...formData, media: file });
  };

  const handleLocationSelect = (location) => {
    setFormData({ ...formData, location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/kwanat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          mediaPath: formData.media ? `/uploads/${formData.media.name}` : '',
          latitude: formData.location?.lat,
          longitude: formData.location?.lng,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add Kwan');
      }

      alert('Kwan added successfully!');
      setFormData({ title: '', description: '', media: null, location: null });
    } catch (error) {
      console.error('Error adding Kwan:', error);
      alert('Failed to add Kwan.');
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
          <MediaUploader onUpload={handleMediaUpload} />
          <MapPicker onLocationSelect={handleLocationSelect} className="w-full h-64 rounded-lg overflow-hidden" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full">
            Submit
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 p-6">
        <img
          src="/path/to/placeholder-image.jpg"
          alt="Add Kwan Illustration"
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default AddKwan;