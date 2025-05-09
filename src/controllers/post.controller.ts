import { Request, Response, NextFunction } from 'express';

import prisma from '../prisma';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';

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
        title,
        text,
        tags,
        imageUrl,
        user: {
          connect: { id: userId },
        },
      },
      select: {
        id: true,
        title: true,
        text: true,
        tags: true,
        viewsCount: true,
        commentsCount: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
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

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        text: true,
        tags: true,
        viewsCount: true,
        commentsCount: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({ message: 'List of all posts', data: posts });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewsCount: {
          increment: 1,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        text: true,
        tags: true,
        viewsCount: true,
        commentsCount: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    res.json({ message: 'Post found', data: post });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request<{ id: string }, {}, UpdatePostDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).userId;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        user: { select: { id: true } },
      },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user.id !== userId) {
      throw new AppError('Access denied', 403);
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: req.body,
      select: {
        id: true,
        title: true,
        text: true,
        tags: true,
        viewsCount: true,
        commentsCount: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
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
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as AuthRequest).userId;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        user: { select: { id: true } },
      },
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    if (post.user.id !== userId) {
      throw new AppError('Access denied', 403);
    }

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getLastTags = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        tags: true,
      },
    });

    const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 5);

    res.json({
      message: 'Last tags fetched successfully',
      data: tags,
    });
  } catch (err) {
    next(err);
  }
};
