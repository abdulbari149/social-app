import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { IData, IModel } from './interface';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class UserSchema {
  @prop({ type: String, required: true })
  public firstName: string;

  @prop({ type: String, required: true })
  public lastName: string;

  @prop({ type: String, required: true, maxlength: 3, minlength: 2 })
  public countryCode: string;

  @prop({ type: String, required: true })
  public phone: string;

  @prop({ type: String, required: false })
  profilePictureUrl: string;

  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true })
  public password: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  public static async getUserByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ email }).exec();
    return user;
  }
}
export type User = IModel<UserSchema>;
export type UserData = IData<UserSchema>;

const UserModel = getModelForClass(UserSchema);

export default UserModel;
