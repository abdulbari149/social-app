import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    APP_PREFIX: str({ default: '/api' }),
    JWT_ACCESS_TOKEN_SECRET: str(),
    JWT_ACCESS_TOKEN_EXPIRES: str(),
    JWT_REFRESH_TOKEN_SECRET: str(),
    JWT_REFRESH_TOKEN_EXPIRES: str()
  });
};

export default validateEnv;
