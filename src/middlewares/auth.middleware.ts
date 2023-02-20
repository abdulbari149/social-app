import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import userModel, { UserData } from '@models/users.model';
import { JWTHelpers } from '@/helpers/jwt.helpers';
import { StatusCodes } from 'http-status-codes';
import { TokenPayload } from '@/interfaces/auth.interface';

const authMiddleware = async (req: Request & { user: UserData }, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (!token) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token Not Found');
    }
    const payload = await JWTHelpers.verifyAccessToken<TokenPayload>(token);
    const user = await userModel.findById(payload.userId).exec();
    if (!user) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Wrong Authentication Token');
    }
    req.user = user.toObject();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
