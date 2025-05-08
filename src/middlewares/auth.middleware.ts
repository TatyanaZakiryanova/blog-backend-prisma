import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';
import { verifyAccessToken } from '../utils/jwt';

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    throw new AppError('No token provided', 401);
  }

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.id;
    next();
  } catch (err) {
    next(new AppError('Invalid or expired token', 401));
  }
};
