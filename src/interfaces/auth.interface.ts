import { Request } from 'express';
import { UserData } from '@/models/users.model';
import { Types } from 'mongoose';

export interface TokenData {
  token: string;
  expiresIn: string;
}

export interface TokenPayload {
  userId: Types.ObjectId | string;
  email: string;
}

export interface LoginResponse {
  accessToken: TokenData;
  refreshToken: TokenData;
  user: Omit<UserData, 'password'>;
}

export interface RegisterResponse extends Omit<UserData, 'password'> {}
