import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { LoginHistoryService } from '@/services/loginHistory.service';

class AuthController {
  private authService = new AuthService();
  private loginHistoryService = new LoginHistoryService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.signup(req.body);
      res.status(StatusCodes.CREATED).json({ data: user, message: 'Signup Successfull', status: StatusCodes.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const loginData = await this.authService.login(userData);

      await this.loginHistoryService.addLoginHistory(loginData.user._id, req);
      res.status(StatusCodes.OK).json({ data: loginData, message: 'login Successfull' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const userData: User = req.user;
      // const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      // res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
