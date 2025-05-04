import express from 'express';

import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createPostSchema } from '../dtos';
import { postController } from '../controllers';

const router = express.Router();

router.post('/', checkAuth, validate(createPostSchema), postController.create);

export default router;
