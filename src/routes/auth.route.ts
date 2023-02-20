import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validate from '@middlewares/validation.middleware';
import { LoginDto, SignupDto } from '@/dtos/auth.dto';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`/signup`, validate(SignupDto, 'body'), this.authController.signUp);
    this.router.post(`/login`, validate(LoginDto, 'body'), this.authController.logIn);
    this.router.post(`/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
