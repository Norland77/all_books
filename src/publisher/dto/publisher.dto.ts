import { IsString } from 'class-validator';

export class PublisherDto {
  @IsString()
  name: string;

  @IsString()
  country: string;
}
