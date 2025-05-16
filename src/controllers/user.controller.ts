import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();

    res.json({ message: 'List of all users', data: users });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);

    const user = await userService.getUserById(userId);

    res.json({ message: 'User found', data: user });
  } catch (err) {
    next(err);
  }
};
