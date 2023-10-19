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

  genderId?: number;

  @IsString()
  country?: string;

  role?: string;

  @IsString()
  avatar?: string;

  provider?: Provider;
}
