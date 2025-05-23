import express from 'express';

import { commentController, postController } from '../controllers';
import { createCommentSchema, createPostSchema, updatePostSchema } from '../dtos';
import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = express.Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', checkAuth, validate(createPostSchema), postController.create);
router.patch('/:id', checkAuth, validate(updatePostSchema), postController.update);
router.delete('/:id', checkAuth, postController.remove);

router.post('/:id/comments', checkAuth, validate(createCommentSchema), commentController.create);
router.get('/:id/comments', commentController.getAll);

export default router;
