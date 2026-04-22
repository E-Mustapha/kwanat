import { useState } from 'react';

const useMediaPreview = () => {
  const [preview, setPreview] = useState(null);

  const handleMediaChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { preview, handleMediaChange };
};

export default useMediaPreview;