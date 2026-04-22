// Migrated from old_code/src/hooks/useMediaPreview.js
import { useState } from 'react';

export const useMediaPreview = () => {
  const [preview, setPreview] = useState(null);

  const generatePreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return { preview, generatePreview };
};