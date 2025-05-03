import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type LoginDto = z.infer<typeof loginSchema>;
