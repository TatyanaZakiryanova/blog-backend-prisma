import express from 'express';

import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createPostSchema, updatePostSchema } from '../dtos';
import { postController } from '../controllers';

const router = express.Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', checkAuth, validate(createPostSchema), postController.create);
router.patch('/:id', checkAuth, validate(updatePostSchema), postController.update);
router.delete('/:id', checkAuth, postController.remove);

export default router;
