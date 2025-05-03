import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { RegisterDto } from '../dtos/register.dto';
import prisma from '../prisma';
import { AppError } from '../utils/AppError';

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
