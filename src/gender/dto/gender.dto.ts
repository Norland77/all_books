import { IsNotEmpty } from 'class-validator';

export class CreateGenderDto {
  id: number;

  @IsNotEmpty()
  name: string;
}
