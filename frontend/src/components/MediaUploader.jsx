import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadMedia } from './api';

const MediaUploader = ({ onUpload, multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previews, setPreviews] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setUploadSuccess(false); // Reset success message on new file drop
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    onUpload(acceptedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await uploadMedia(formData);
      setUploadSuccess(true);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500">
        <input {...getInputProps()} multiple={multiple} />
        <p className="text-gray-600">Drag and drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-bold">Selected Files:</h4>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index} className="text-gray-700">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="preview-grid grid grid-cols-3 gap-4 mt-4">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>
      <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Upload</button>
      {uploadSuccess && (
        <p className="mt-4 text-green-600">Files uploaded successfully!</p>
      )}
    </div>
  );
};

export default MediaUploader;