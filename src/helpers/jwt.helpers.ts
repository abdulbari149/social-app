import { jwt } from '@/config';
import { TokenData } from '@/interfaces/auth.interface';
import { sign, verify } from 'jsonwebtoken';

export class JWTHelpers {
  public async signAccessToken<T extends object>(data: T): Promise<TokenData> {
    const token = sign(data, jwt.access.secret, { expiresIn: jwt.access.expiresIn });
    return {
      token,
      expiresIn: jwt.access.expiresIn,
    };
  }

  public static async verifyAccessToken<T extends object>(token: string): Promise<T> {
    const payload = await verify(token, jwt.access.secret) as T;
    return payload;
  }

  public async signRefreshToken<T extends object>(data: T): Promise<TokenData> {
    const token = sign(data, jwt.refresh.secret, { expiresIn: jwt.refresh.expiresIn });
    return {
      token,
      expiresIn: jwt.refresh.expiresIn,
    };
  }
}
