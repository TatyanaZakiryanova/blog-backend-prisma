import express from 'express';

import { uploadController } from '../controllers';
import { checkAuth } from '../middlewares/auth.middleware';
import { uploadAvatarImage, uploadPostImage } from '../middlewares/multer.middleware';

const router = express.Router();

router.post('/upload', checkAuth, uploadPostImage.single('image'), uploadController.upload);
router.post('/upload-avatar', uploadAvatarImage.single('avatar'), uploadController.upload);

export default router;
