import multer from 'multer';
import path from 'path';
import { validateMedia } from './validation.js';

// Safe and cross-platform relative path
const uploadPath = path.resolve('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Now correctly resolves to the uploads folder in your project
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${uniqueSuffix}-${base}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  try {
    validateMedia(file); // your custom validation logic
    cb(null, true);
  } catch (error) {
    cb(new Error(error.message));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Optional: 5MB max per file
  },
});

export const uploadMedia = upload.array('media', 10);

export const handleFormData = (req, res, next) => {
  const { title, description, latitude, longitude } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No media files uploaded' });
  }

  const mediaFilenames = req.files.map((file) => file.filename); // ✅ use filename only

  req.kuwanData = {
    title,
    description,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    mediaPaths: mediaFilenames, // renamed for clarity, still an array
  };

  next();
};

