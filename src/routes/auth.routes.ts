import express from 'express';

import { authController } from '../controllers';
import { loginSchema, registerSchema } from '../dtos';
import { checkAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', checkAuth, authController.getMe);

router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', authController.logout);

export default router;
