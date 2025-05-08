import express from 'express';

import { uploadMiddleware } from '../middlewares/multer.middleware';
import { uploadController } from '../controllers';
import { checkAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/upload', checkAuth, uploadMiddleware.single('image'), uploadController.upload);

export default router;
