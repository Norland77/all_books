import { IsString } from 'class-validator';

export class ReviewDto {
  rating: number;

  @IsString()
  title: string;

  @IsString()
  body: string;
}
