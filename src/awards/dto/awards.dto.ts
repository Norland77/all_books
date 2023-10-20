import { IsString } from 'class-validator';

export class AwardsDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  date: Date;
}
