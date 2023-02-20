import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import validate from '@/middlewares/validation.middleware'
import { CreatePostDto } from "@/dtos/posts.dto";
import { PostsController } from "@/controllers/posts.controller";

class PostRoute implements Routes {
  public path = "/posts"
  public router: Router = Router();

  private postsController = new PostsController()
  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', validate(CreatePostDto, 'body'), this.postsController.createPost)
  }
}