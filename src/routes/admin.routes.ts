import express from 'express';

import { checkRole } from '../middlewares/role.middleware';
import { adminController } from '../controllers';
import { checkAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/users', checkAuth, checkRole(['ADMIN']), adminController.getAll);
router.get('/users/:id', checkAuth, checkRole(['ADMIN']), adminController.getOne);
router.delete('/users/:id', checkAuth, checkRole(['ADMIN']), adminController.deleteUser);
router.delete('/posts/:id', checkAuth, checkRole(['ADMIN']), adminController.deletePost);
router.delete('/comments/:id', checkAuth, checkRole(['ADMIN']), adminController.deleteComment);

export default router;
