import React, { useState } from 'react';

const MediaUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Upload Media</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {preview && (
        <div className="mt-4">
          <p className="text-gray-700">Preview:</p>
          <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default MediaUploader;