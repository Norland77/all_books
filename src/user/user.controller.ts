import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../../libs/common/src/decorators';
import { IJwtPayload } from '../auth/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':Id')
  async findUserById(@Param('Id') Id: string) {
    return await this.userService.findUserById(Id);
  }

  @Delete(':Id')
  async deleteUserById(
    @Param('Id') Id: string,
    @CurrentUser() user: IJwtPayload,
  ) {
    return await this.userService.deleteUserById(Id, user);
  }
}
