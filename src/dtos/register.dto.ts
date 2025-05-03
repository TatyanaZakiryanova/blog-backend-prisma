import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
});

export type RegisterDto = z.infer<typeof registerSchema>;
