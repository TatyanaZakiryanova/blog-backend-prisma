import { NextFunction, Request, Response } from 'express';

import prisma from '../prisma';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { postService } from '../services';
import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';

export const create = async (
  req: Request<{}, {}, CreatePostDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as AuthRequest).userId;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const post = await postService.createPost(req.body, userId);

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
    const posts = await postService.getAllPosts();

    res.json({ message: 'List of all posts', data: posts });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);

    const post = await postService.getOnePost(postId);

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
    const postId = Number(req.params.id);
    const userId = (req as AuthRequest).userId;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const post = await postService.updatePost(req.body, postId, userId);

    res.json({
      message: 'Post updated successfully',
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);
    const userId = (req as AuthRequest).userId;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    await postService.removePost(postId, userId);

    res.json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getLastTags = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await postService.getLastTagsService();

    res.json({
      message: 'Last tags fetched successfully',
      data: tags,
    });
  } catch (err) {
    next(err);
  }
};
