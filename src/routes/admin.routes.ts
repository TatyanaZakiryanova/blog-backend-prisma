import { Router } from 'express';

import { checkRole } from '../middlewares/role.middleware';
import { adminController, userController } from '../controllers';
import { checkAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/users', checkAuth, checkRole(['ADMIN']), userController.getAll);
router.delete('/users/:id', checkAuth, checkRole(['ADMIN']), adminController.deleteUser);
router.delete('/posts/:id', checkAuth, checkRole(['ADMIN']), adminController.deletePost);
router.delete('/comments/:id', checkAuth, checkRole(['ADMIN']), adminController.deleteComment);

export default router;
