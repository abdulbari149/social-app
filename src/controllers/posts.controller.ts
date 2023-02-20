import { PostsService } from '@/services/posts.service';
import { NextFunction, Request, Response } from 'express';

export class PostsController {
  private postsService: PostsService = new PostsService();

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try { 
      
    } catch (error) {
      next(error)
    }
  };
}
