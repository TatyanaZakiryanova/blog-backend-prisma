import { Request, Response, NextFunction } from 'express';

import { AppError } from '../utils/AppError';

export const upload = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file || !('path' in req.file)) {
      throw new AppError('No file uploaded', 400);
    }

    const file = req.file as Express.Multer.File & { path: string };

    res.json({
      url: file.path,
    });
  } catch (err) {
    next(err);
  }
};
