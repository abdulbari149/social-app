import { Request } from 'express';
import { Types } from 'mongoose';

export class LoginHistoryService {
  public addLoginHistory = async (userId: Types.ObjectId, req: Request) => {
    const ip = req.headers['x-forwarded-for'] || '' || req.socket.remoteAddress;
    console.log({ ip });
  };
}
