import express from 'express';
import { serveImage } from '../controllers/imageController.js';

const router = express.Router();

router.get('/images/:filename', serveImage); // GET /api/images/filename.jpg

export default router;
