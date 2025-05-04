import express from 'express';

import { postController } from '../controllers';

const router = express.Router();

router.get('/tags', postController.getLastTags);

export default router;
