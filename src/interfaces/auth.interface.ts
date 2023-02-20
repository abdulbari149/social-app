import { Request } from 'express';
import { UserData } from '@/models/users.model';

export interface TokenData {
  token: string;
  expiresIn: string;
}

export interface LoginResponse {
  accessToken: TokenData;
  refreshToken: TokenData;
  user: Omit<UserData, 'password'>;
}

export interface RegisterResponse extends Omit<UserData, 'password'> {}
