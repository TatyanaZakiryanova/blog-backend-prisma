import express from 'express';

import { userController } from '../controllers';
import { loginSchema, registerSchema } from '../dtos';
import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/me', checkAuth, userController.getMe);

router.post('/refresh-token', userController.refreshAccessToken);

export default router;
