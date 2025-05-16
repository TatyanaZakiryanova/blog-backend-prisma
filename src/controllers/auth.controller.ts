import { NextFunction, Request, Response } from 'express';

import { LoginDto, RegisterDto } from '../dtos';
import { authService, userService } from '../services';
import { AuthRequest } from '../types';
import { AppError } from '../utils/AppError';

export const register = async (
  req: Request<{}, {}, RegisterDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user, accessToken, refreshToken } = await authService.registerUser(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'User created successfully',
      data: { ...user, accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await authService.loginUser(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      data: { ...user, accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }

    const user = await userService.getUserById(userId);

    res.json({
      message: 'User data retrieved successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError('No refresh token provided', 401);
    }

    const newAccessToken = authService.refreshAccessTokenService(token);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};
