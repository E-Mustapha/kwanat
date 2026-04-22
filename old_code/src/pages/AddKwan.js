import React, { useState } from 'react';
import FormField from '../components/FormField';
import MediaUploader from '../components/MediaUploader';
import MapPicker from '../components/MapPicker';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
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
      <MapPicker onLocationSelect={handleLocationSelect} />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default AddKwan;