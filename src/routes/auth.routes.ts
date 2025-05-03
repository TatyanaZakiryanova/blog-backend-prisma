import express from 'express';

import { userController } from '../controllers';
import { validate } from '../middlewares/validate.middleware';
import { checkAuth } from '../middlewares/auth.middleware';
import { loginSchema, registerSchema } from '../dtos';

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/me', checkAuth, userController.getMe);

export default router;
