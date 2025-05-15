import { NextFunction, Request, Response } from 'express';

import { adminService } from '../services';
import { deleteCommentService } from '../services/admin.service';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getAllUsers();

    res.json({ message: 'List of all users', data: users });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);

    await adminService.deleteUserService(userId);

    res.json({
      message: 'User deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = Number(req.params.id);

    await adminService.deletePostService(postId);

    res.json({
      message: 'Post deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const commentId = Number(req.params.id);

    await deleteCommentService(commentId);

    res.json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
