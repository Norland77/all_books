import { Injectable } from '@nestjs/common';
import { ResetPasswordRepository } from './reset-password.repository';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: ResetPasswordRepository,
  ) {}

  setResetPasswordToken(email: string, token: string) {
    return this.resetPasswordRepository.setResetPasswordToken(email, token);
  }

  verifyResetPasswordToken(token: string) {
    return this.resetPasswordRepository.verifyResetPasswordToken(token);
  }

  deleteResetPasswordToken(id: string) {
    return this.resetPasswordRepository.deleteResetPasswordToken(id);
  }
}
