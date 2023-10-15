import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.getUserByName(dto.username, dto.email);

    if (user) {
      throw new BadRequestException('This username or email is already in use');
    }
    return await this.userService.createUser(dto);
  }

  @Get(':Id')
  async findUserById(@Param('Id') Id: string) {
    const numberId = Number(Id);
    return await this.userService.findUserById(numberId);
  }

  @Delete(':Id')
  async deleteUserById(@Param('Id') Id: string) {
    const numberId = Number(Id);
    return await this.userService.deleteUserById(numberId);
  }
}
