import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthRequest } from '../types';

export const checkAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    res.status(401).json({
      message: 'No token provided',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload & { id: number };
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token',
    });
    return;
  }
};
