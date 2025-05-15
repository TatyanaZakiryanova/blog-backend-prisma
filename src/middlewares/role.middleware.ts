import { NextFunction, Response } from 'express';
import { Role } from '@prisma/client';

import prisma from '../prisma';
import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';

export const checkRole = (roles: Role[]) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.userId) {
      return next(new AppError('User not authenticated', 401));
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (!roles.includes(user.role)) {
      return next(new AppError('Forbidden: insufficient role', 403));
    }

    next();
  };
};
