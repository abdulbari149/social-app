import { IsPhoneNumberForRegion } from '@/validators/phone.validator';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class SignupDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @MaxLength(3)
  @MinLength(2)
  @IsString()
  public countryCode: string;

  @IsPhoneNumberForRegion('countryCode')
  public phone: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
