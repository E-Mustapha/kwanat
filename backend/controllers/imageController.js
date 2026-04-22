import path from 'path';
import fs from 'fs';

export const serveImage = (req, res) => {
  const { filename } = req.params;

  // Sanitize filename
  const safeFilename = path.basename(filename); // prevents path traversal
  const imagePath = path.resolve('uploads', safeFilename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.sendFile(imagePath);
  });
};
