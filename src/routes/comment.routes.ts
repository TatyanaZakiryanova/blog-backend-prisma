import express from 'express';

import { commentController } from '../controllers';
import { updateCommentSchema } from '../dtos';
import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = express.Router();

router.patch('/:id', checkAuth, validate(updateCommentSchema), commentController.update);
router.delete('/:id', checkAuth, commentController.remove);

export default router;
