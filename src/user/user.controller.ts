import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../../libs/common/src/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;
import { UpdateUserDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':Id')
  async findUserById(@Param('Id') Id: string) {
    return await this.userService.findUserById(Id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':Id')
  async deleteUserById(@Param('Id') Id: string) {
    return await this.userService.deleteUserById(Id);
  }

  @Put('update/:Id')
  async updateUserById(@Param('Id') Id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.updateUserById(Id, dto);
  }
}
