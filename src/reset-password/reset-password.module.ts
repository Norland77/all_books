import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordRepository } from './reset-password.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ResetPasswordService, ResetPasswordRepository],
  controllers: [ResetPasswordController, ResetPasswordRepository],
  imports: [UserModule],
})
export class ResetPasswordModule {}
