import bcrypt from 'bcrypt';

import prisma from '../prisma';
import { LoginDto, RegisterDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const registerUser = async (dto: RegisterDto) => {
  const { fullName, email, password } = dto;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: { fullName, email, passwordHash: hash },
  });

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  const { passwordHash, ...cleanUser } = user;

  return { user: cleanUser, accessToken, refreshToken };
};

export const loginUser = async (dto: LoginDto) => {
  const { email, password } = dto;

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

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  const { passwordHash, ...cleanUser } = user;

  return { user: cleanUser, accessToken, refreshToken };
};

export const getAllUsers = async () => {
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

  return users;
};

export const getUserById = async (userId: number) => {
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

  return user;
};

export const refreshAccessTokenService = (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError('No refresh token provided', 401);
  }

  const payload = verifyRefreshToken(refreshToken);
  return signAccessToken(payload.id);
};
