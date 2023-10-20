import { IsString } from 'class-validator';

export class ShelfDto {
  @IsString()
  name: string;
}
