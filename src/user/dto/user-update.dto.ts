import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;

  genderName: string;

  @IsString()
  country?: string;

  @IsString()
  avatar?: string;
}
