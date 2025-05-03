import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../prisma';
import { AppError } from '../utils/AppError';
import { LoginDto, RegisterDto } from '../dtos';
import { AuthRequest } from '../types';

export const register = async (
  req: Request<{}, {}, RegisterDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { fullName, email, passwordHash: hash },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '30d' });

    const { passwordHash, ...cleanUser } = user;

    res.status(201).json({
      message: 'User created successfully',
      data: { ...cleanUser, token },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect login or password', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Incorrect login or password', 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '30d' });

    const { passwordHash, ...cleanUser } = user;

    res.status(200).json({
      message: 'Login successful',
      data: { ...cleanUser, token },
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users) {
      throw new AppError('Users not found', 404);
    }

    res.json({ message: 'List of all users', data: users });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ message: 'User found', data: user });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      message: 'User data retrieved successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
