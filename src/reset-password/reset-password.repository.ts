import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Controller('reset-password')
export class ResetPasswordRepository {
  constructor(private readonly prismaService: PrismaService) {}

  setResetPasswordToken(email: string, token: string) {
    return this.prismaService.resetPassword.create({
      data: {
        email,
        token,
      },
    });
  }

  verifyResetPasswordToken(token: string) {
    return this.prismaService.resetPassword.findFirst({
      where: {
        token,
      },
    });
  }

  deleteResetPasswordToken(id: string) {
    return this.prismaService.resetPassword.delete({
      where: {
        id,
      },
    });
  }
}
