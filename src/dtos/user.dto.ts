import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email().max(100),
  password: z.string().trim().min(5).max(100),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(100),
  password: z.string().trim().min(5).max(100),
  avatarUrl: z.string().nullable().default(null),
});

export type RegisterDto = z.infer<typeof registerSchema>;
