import { Request, Response, NextFunction } from 'express';

import prisma from '../prisma';
import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';

export const create = async (
  req: Request<{ id: string }, {}, CreateCommentDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = Number(req.params.id);
    const userId = Number((req as AuthRequest).userId);
    const { text } = req.body;

    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      throw new AppError('Post not found', 404);
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });

    res.status(201).json({
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      message: 'List of all comments',
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request<{ id: string }, {}, UpdateCommentDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const commentId = Number(req.params.id);
    const userId = Number((req as AuthRequest).userId);
    const { text } = req.body;

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (existingComment.userId !== userId) {
      throw new AppError('Access denied', 403);
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });

    res.json({ message: 'Comment updated successfully', data: updatedComment });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const commentId = Number(req.params.id);
    const userId = Number((req as AuthRequest).userId);

    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    if (existingComment.userId !== userId) {
      throw new AppError('Access denied', 403);
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    await prisma.post.update({
      where: { id: existingComment.postId },
      data: {
        commentsCount: {
          decrement: 1,
        },
      },
    });

    res.json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
