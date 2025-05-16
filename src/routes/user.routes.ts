import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);

export default router;
