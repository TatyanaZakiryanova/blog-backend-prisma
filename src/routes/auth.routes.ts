import express from 'express';
import { userController } from '../controllers';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema } from '../dtos/register.dto';

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);

export default router;
