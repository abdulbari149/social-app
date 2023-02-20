import { IsPhoneNumberForRegion } from '@/validators/phone.validator';
import { IsEmail, IsNumber, IsNumberString, IsPhoneNumber, IsString, Max, Min, Validate } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
  
  @Max(3)
  @Min(2)
  @IsNumberString()
  public countryCode: string;
  
  @IsPhoneNumberForRegion("countryCode")
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
