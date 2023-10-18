import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordsMatchingConstraint } from '../../../libs/common/src/decorators';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(8)
  @Validate(IsPasswordsMatchingConstraint)
  passwordRepeat: string;

  @IsString()
  first_name: string = '';

  @IsString()
  last_name: string = '';

  genderId: number = 3;

  @IsString()
  country: string = '';

  role: string;

  @IsString()
  avatar: string = '';
}
