import { Request, Response, NextFunction, RequestHandler } from 'express';

import prisma from '../prisma';
import { CreatePostDto } from '../dtos';
import { AuthRequest } from '../types';

export const create = async (
  req: Request<{}, {}, CreatePostDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, title, tags, imageUrl } = req.body;
    const userId = (req as AuthRequest).userId;

    const post = await prisma.post.create({
      data: {
        text,
        title,
        tags,
        imageUrl,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({
      message: 'Post created successfully',
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
