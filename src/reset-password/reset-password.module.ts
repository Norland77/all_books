import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordRepository } from './reset-password.repository';

@Module({
  providers: [ResetPasswordService, ResetPasswordRepository],
  controllers: [ResetPasswordController, ResetPasswordRepository],
})
export class ResetPasswordModule {}
