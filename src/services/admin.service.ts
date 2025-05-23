import prisma from '../prisma';
import { AppError } from '../utils/AppError';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      role: true,
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
      role: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const deleteUserService = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await prisma.user.delete({ where: { id: userId } });
};

export const deletePostService = async (postId: number) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  await prisma.post.delete({ where: { id: postId } });
};

export const deleteCommentService = async (commentId: number) => {
  const existingComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!existingComment) {
    throw new AppError('Comment not found', 404);
  }

  await prisma.$transaction([
    prisma.comment.delete({
      where: { id: commentId },
    }),

    prisma.post.update({
      where: { id: existingComment.postId },
      data: {
        commentsCount: {
          decrement: 1,
        },
      },
    }),
  ]);
};
