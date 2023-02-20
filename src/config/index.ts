import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, APP_PREFIX } = process.env;

export const jwt: Record<'access' | 'refresh', { secret: string; expiresIn: string }> = {
  access: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  },
  refresh: {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  },
};
