import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { FollowRepository } from './follow.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [FollowService, FollowRepository],
  controllers: [FollowController, FollowRepository],
  imports: [UserModule],
})
export class FollowModule {}
