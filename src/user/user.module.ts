import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { GenderModule } from '../gender/gender.module';
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController, UserRepository],
  imports: [GenderModule],
})
export class UserModule {}
