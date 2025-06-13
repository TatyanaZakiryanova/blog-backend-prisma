import prisma from '../prisma';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { AppError } from '../utils/AppError';
import { Prisma } from '@prisma/client';

export const createPost = async (dto: CreatePostDto, userId: number) => {
  const { text, title, tags, imageUrl } = dto;

  const post = await prisma.post.create({
    data: {
      title,
      text,
      tags,
      imageUrl,
      user: {
        connect: { id: userId },
      },
    },
    select: {
      id: true,
      title: true,
      text: true,
      tags: true,
      viewsCount: true,
      commentsCount: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return post;
};

export const getAllPosts = async (sortParam?: string, tagFilter?: string, page = 1, limit = 10) => {
  const sortBy: Prisma.PostOrderByWithRelationInput =
    sortParam === 'popular' ? { viewsCount: 'desc' } : { createdAt: 'desc' };

  const where: Prisma.PostWhereInput = tagFilter ? { tags: { has: tagFilter } } : {};

  const posts = await prisma.post.findMany({
    where,
    orderBy: sortBy,
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      text: true,
      tags: true,
      viewsCount: true,
      commentsCount: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return posts;
};

export const getOnePost = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      title: true,
      text: true,
      tags: true,
      viewsCount: true,
      commentsCount: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      viewsCount: {
        increment: 1,
      },
    },
  });

  return post;
};

export const updatePost = async (dto: UpdatePostDto, postId: number, userId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      user: { select: { id: true } },
    },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  if (post.user.id !== userId) {
    throw new AppError('Access denied', 403);
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: dto,
    select: {
      id: true,
      title: true,
      text: true,
      tags: true,
      viewsCount: true,
      commentsCount: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return updatedPost;
};

export const removePost = async (postId: number, userId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      user: { select: { id: true } },
    },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  if (post.user.id !== userId) {
    throw new AppError('Access denied', 403);
  }

  await prisma.post.delete({
    where: { id: postId },
  });
};

export const getLastTagsService = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      tags: true,
    },
  });

  const tags = [...new Set(posts.flatMap((post) => post.tags))].slice(0, 5);

  return tags;
};
