import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerConfig from './config/swagger.config';

import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import commentRoutes from './routes/comment.routes';
import postRoutes from './routes/post.routes';
import tagsRoutes from './routes/tags.routes';
import uploadRoutes from './routes/upload.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

const swaggerSpec = swaggerJSDoc(swaggerConfig);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://blog-frontend-rho-bice.vercel.app',
    credentials: true,
  }),
);

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use(uploadRoutes);
app.use(tagsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
