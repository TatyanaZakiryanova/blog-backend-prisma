import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const signAccessToken = (id: number) => {
  return jwt.sign({ id }, ACCESS_SECRET, { expiresIn: '15m' });
};

export const signRefreshToken = (id: number) => {
  return jwt.sign({ id }, REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as { id: number };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as { id: number };
};
