import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
}

export interface GetAllQuery {
  sort?: 'popular' | 'newest';
  tag?: string;
  page: string;
  pageSize: string;
}
