import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController, UserRepository]
})
export class UserModule {}
