export const uploadMedia = async (formData) => {
  const uploadedPaths = [];

  for (const file of formData.getAll('files')) {
    const filePath = `uploads/${file.name}`; // Simulate saving to a local folder
    uploadedPaths.push(filePath);
  }

  return uploadedPaths;
};