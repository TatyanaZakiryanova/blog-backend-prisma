import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(2),
  text: z.string().min(2),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().optional(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  title: z.string().min(2).optional(),
  text: z.string().min(2).optional(),
  tags: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
});

export type UpdatePostDto = z.infer<typeof updatePostSchema>;
