import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BansService } from './bans.service';
import { UserService } from '../user/user.service';
import { CreateBansDto } from './dto/bans.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../libs/common/src/decorators';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

@Controller('ban')
export class BansController {
  constructor(
    private readonly bansService: BansService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/:Id')
  async banUserById(@Param('Id') Id: string, @Body() dto: CreateBansDto) {
    const user = await this.userService.findUserById(Id);

    if (!user) {
      throw new BadRequestException(`Can't find user by id ${Id}`);
    }

    if (user.isBanned) {
      throw new BadRequestException('This user has already banned');
    }

    return this.bansService.banUserById(Id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('unban/:Id')
  async unbannedUserById(@Param('Id') Id: string) {
    const user = await this.userService.findUserById(Id);

    if (!user) {
      throw new BadRequestException(`Can't find user by id ${Id}`);
    }

    if (!user.isBanned) {
      throw new BadRequestException('This user is not blocked');
    }

    const lastBan = await this.bansService.findLastBan(Id);

    if (!lastBan) {
      throw new BadRequestException('This user dont have active bans');
    }

    return this.bansService.unbannedUserById(Id, lastBan);
  }
}
