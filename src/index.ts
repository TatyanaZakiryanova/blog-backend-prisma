import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
