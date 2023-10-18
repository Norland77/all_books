import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser, Roles } from '../../libs/common/src/decorators';
import { IJwtPayload } from '../auth/interfaces';
import { RolesGuard } from '../auth/guards/roles.guard';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

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
  async deleteUserById(
    @Param('Id') Id: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    return await this.userService.deleteUserById(Id, user);
  }
}
