import {
  BadRequestException,
  Controller, Delete,
  Get,
  Param,
  Post
} from "@nestjs/common";
import { FollowService } from './follow.service';
import { Cookie } from '../../libs/common/src/decorators';
import { UserService } from '../user/user.service';
const REFRESH_TOKEN = 'refreshtoken111';
@Controller('follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private readonly userService: UserService,
  ) {}

  @Post('/:Id')
  async followById(
    @Param('Id') Id: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const followUser = await this.userService.findUserById(Id);

    if (!followUser) {
      throw new BadRequestException(`User with id: ${Id} does not exist`);
    }

    const currentUser =
      await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!currentUser) {
      throw new BadRequestException();
    }

    if (currentUser.userId === Id) {
      throw new BadRequestException('You can`t follow yourself');
    }

    return this.followService.followById(Id, currentUser.userId);
  }

  @Get('all/:Id')
  async findAllFollowById(@Param('Id') Id: string) {
    const user = await this.userService.findUserById(Id);

    if (!user) {
      throw new BadRequestException(`User with id: ${Id} does not exist`);
    }

    return this.followService.findAllFollowById(Id);
  }

  @Delete('unfollow/:Id')
  async unfollowById(
    @Param('Id') Id: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const followUser = await this.userService.findUserById(Id);

    if (!followUser) {
      throw new BadRequestException(`User with id: ${Id} does not exist`);
    }

    const currentUser =
      await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!currentUser) {
      throw new BadRequestException();
    }

    if (currentUser.userId === Id) {
      throw new BadRequestException('You can`t unfollow yourself');
    }

    return this.followService.unfollowById(Id, currentUser.userId);
  }
}
