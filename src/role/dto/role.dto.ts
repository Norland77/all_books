import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  id: number;

  @IsNotEmpty()
  name: string;
}
