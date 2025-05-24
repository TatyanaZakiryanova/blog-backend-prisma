import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  avatarUrl: z.string().nullable().default(null),
});

export type RegisterDto = z.infer<typeof registerSchema>;
