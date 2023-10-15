import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  first_name: string;

  last_name: string;

  genderId: number;

  country: string;

  roleId: number;

  avatar: string;

  isBanned: boolean;

  gender: object[];
}
