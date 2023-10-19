import { IsString } from 'class-validator';

export class AuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  bio: string;

  @IsString()
  country: string;

  dateOfBirth: Date;

  @IsString()
  image: string;
}
