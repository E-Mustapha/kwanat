export const validateMedia = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPG, PNG, and MP4 are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size exceeds the 5MB limit.');
  }

  return true;
};