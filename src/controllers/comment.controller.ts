import { NextFunction, Request, Response } from 'express';

import { CreateCommentDto, UpdateCommentDto } from '../dtos';
import { AuthRequest } from '../types';
import { commentService } from '../services';

export const create = async (
  req: Request<{ id: string }, {}, CreateCommentDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = Number(req.params.id);
    const userId = Number((req as AuthRequest).userId);
    const comment = await commentService.createComment(req.body, postId, userId);

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

    const comments = await commentService.getAllComments(postId);

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
    const comment = await commentService.updateComment(req.body, commentId, userId);

    res.json({ message: 'Comment updated successfully', data: comment });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const commentId = Number(req.params.id);
    const userId = Number((req as AuthRequest).userId);

    await commentService.removeComment(commentId, userId);

    res.json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
