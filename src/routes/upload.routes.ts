import express from 'express';

import { uploadController } from '../controllers';
import { checkAuth } from '../middlewares/auth.middleware';
import { uploadMiddleware } from '../middlewares/multer.middleware';

const router = express.Router();

router.post('/upload', checkAuth, uploadMiddleware.single('image'), uploadController.upload);

export default router;
