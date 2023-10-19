import { IsString } from 'class-validator';

export class CreateBansDto {
  @IsString()
  reason: string;
}
