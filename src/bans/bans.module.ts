import { Module } from '@nestjs/common';
import { BansService } from './bans.service';
import { BansController } from './bans.controller';
import { BansRepository } from './bans.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [BansService, BansRepository],
  controllers: [BansController, BansRepository],
  imports: [UserModule],
})
export class BansModule {}
