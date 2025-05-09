import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

export default router;
