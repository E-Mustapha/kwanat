import express from 'express';
import { getAllKwanat, addKwan } from '../controllers/kwanatController.js';
import { uploadMedia, handleFormData } from '../services/mediaService.js';

const router = express.Router();

// Endpoint to get all Kwanat
router.get('/kwanat', getAllKwanat);

// Endpoint to add a new Kwan
router.post('/kwanat', uploadMedia, handleFormData, addKwan);

export default router;