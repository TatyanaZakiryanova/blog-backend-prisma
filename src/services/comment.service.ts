import prisma from '../prisma';
import { CreateCommentDto, UpdateCommentDto } from '../dtos';
import { AppError } from '../utils/AppError';

export const createComment = async (dto: CreateCommentDto, postId: number, userId: number) => {
  const { text } = dto;

  const postExists = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!postExists) {
    throw new AppError('Post not found', 404);
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      postId,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  await prisma.post.update({
    where: { id: postId },
    data: {
      commentsCount: {
        increment: 1,
      },
    },
  });

  return comment;
};

export const getAllComments = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return comments;
};

export const updateComment = async (dto: UpdateCommentDto, commentId: number, userId: number) => {
  const { text } = dto;

  const existingComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!existingComment) {
    throw new AppError('Comment not found', 404);
  }

  if (existingComment.userId !== userId) {
    throw new AppError('Access denied', 403);
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { text },
  });

  return updatedComment;
};

export const removeComment = async (commentId: number, userId: number) => {
  const existingComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!existingComment) {
    throw new AppError('Comment not found', 404);
  }

  if (existingComment.userId !== userId) {
    throw new AppError('Access denied', 403);
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  await prisma.post.update({
    where: { id: existingComment.postId },
    data: {
      commentsCount: {
        decrement: 1,
      },
    },
  });
};
