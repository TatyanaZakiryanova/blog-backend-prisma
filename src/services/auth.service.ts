import bcrypt from 'bcrypt';

import prisma from '../prisma';
import { LoginDto, RegisterDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

export const registerUser = async (dto: RegisterDto) => {
  const { fullName, email, password, avatarUrl } = dto;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new AppError('User already exists', 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: { fullName, email, passwordHash: hash, avatarUrl },
  });

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  const { passwordHash, role, ...cleanUser } = user;

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

  const { passwordHash, role, ...cleanUser } = user;

  return { user: cleanUser, accessToken, refreshToken };
};

export const refreshAccessTokenService = (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  return signAccessToken(payload.id);
};
