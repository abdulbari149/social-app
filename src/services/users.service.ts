import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import userModel, { User, UserData } from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  // public users = userModel;

  public async findAllUser(): Promise<UserData[]> {
    const users: UserData[] = await userModel.find().lean().exec();
    return users;
  }

  public async findUserById(userId: string): Promise<UserData> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const user: UserData = await userModel.findOne({ _id: userId }).lean().exec();
    if (!user) throw new HttpException(409, "User doesn't exist");

    return user;
  }

  public async createUser(data: CreateUserDto): Promise<UserData> {
    if (isEmpty(data)) throw new HttpException(400, 'userData is empty');

    const user: User = await userModel.getUserByEmail(data.email);
    if (user) throw new HttpException(409, `This email ${data.email} already exists`);
    const hashedPassword = await hash(data.password, 10);
    const createUserData: User = await userModel.create({ ...data, password: hashedPassword });
    return createUserData.toObject();
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const user: User = await userModel.getUserByEmail(userData.email);
      if (user && user._id.equals(userId)) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await userModel.findByIdAndUpdate(userId, { ...userData }).exec();
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await userModel.findByIdAndDelete(userId).exec();
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");
    return deleteUserById;
  }
}

export default UserService;
