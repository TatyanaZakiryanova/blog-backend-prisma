import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import commentRoutes from './routes/comment.routes';
import postRoutes from './routes/post.routes';
import tagsRoutes from './routes/tags.routes';
import uploadRoutes from './routes/upload.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use(uploadRoutes);
app.use(tagsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
