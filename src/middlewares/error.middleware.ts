import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const error = new HttpException(500, 'Something went wrong');
    Object.assign(error, err);
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${error.status}, Message:: ${error.message}`);
    res.status(error.status).json({ ...error, message: err.message, data: null });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
