import { hash, compare } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { LoginResponse, RegisterResponse } from '@interfaces/auth.interface';
import userModel, { User } from '@models/users.model';

import { isEmpty, omit } from '@utils/util';
import { LoginDto, SignupDto } from '@/dtos/auth.dto';
import { JWTHelpers } from '@/helpers/jwt.helpers';
class AuthService {
  private jwtHelpers = new JWTHelpers();
  public async signup(data: SignupDto): Promise<RegisterResponse> {
    if (isEmpty(data)) throw new HttpException(400, 'registration data is empty');
    const user: User = await userModel.getUserByEmail(data.email);
    if (user) {
      throw new HttpException(409, `This email ${data.email} already exists`);
    }
    const hashedPassword = await hash(data.password, 10);
    const newUser: User = await userModel.create({ ...data, password: hashedPassword });
    const result = omit(newUser.toObject(), 'password');
    return result;
  }

  public async login(data: LoginDto): Promise<LoginResponse> {
    if (isEmpty(data)) throw new HttpException(400, 'login is empty');
    const user: User = await userModel.getUserByEmail(data.email);
    if (!user) throw new HttpException(409, `This email ${data.email} was not found`);

    const isPasswordMatching: boolean = await compare(data.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenPayload = { id: user._id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtHelpers.signAccessToken(tokenPayload),
      this.jwtHelpers.signRefreshToken(tokenPayload),
    ]);
    return { user: omit(user.toObject(), 'password'), accessToken, refreshToken };
  }

  public async logout(data: User): Promise<User> {
    if (isEmpty(data)) throw new HttpException(400, 'data is empty');
    const user: User = await userModel.getUserByEmail(data.email);
    if (!user) throw new HttpException(409, `This email ${data.email} was not found`);
    return user;
  }
}

export default AuthService;
