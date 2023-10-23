import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';
import { Provider } from '../../../prisma/generated/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password?: string;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  genderName: string;

  @IsString()
  country?: string;

  role?: string;

  isBanned?: boolean;

  @IsString()
  avatar?: string;

  provider?: Provider;
}
