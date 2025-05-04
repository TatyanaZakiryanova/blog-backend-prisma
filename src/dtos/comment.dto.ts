import { z } from 'zod';

export const createCommentSchema = z.object({
  text: z.string().min(1),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;

export const updateCommentSchema = z.object({
  text: z.string().min(1).optional(),
});

export type UpdateCommentDto = z.infer<typeof updateCommentSchema>;
