import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '../../libs/common/src/decorators';
@Public()
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'allbooksukraine@gmail.com',
      pass: 'iyrw kuzm zzyq htad',
    },
  });

  @Post('/:Email')
  async resetPasswordByEmail(@Param('Email') email: string) {
    const token = uuidv4();

    const info = await this.transporter.sendMail({
      from: '"Nikita Foka" <allbooksukraine@gmail.com>',
      to: email,
      subject: 'Відновлення паролю',
      text: `Для відновлення паролю перейдіть за посиланням http://localhost:3000/api/reset-password/verify/${token}`,
    });

    if (!info) {
      throw new BadRequestException('Email dont receive');
    }

    return this.resetPasswordService.setResetPasswordToken(email, token);
  }

  @Get('verify/:Token')
  async verifyResetPasswordToken(@Param('Token') token: string) {
    const verify =
      await this.resetPasswordService.verifyResetPasswordToken(token);

    if (!verify) {
      throw new BadRequestException(
        'The link has already been used, please request a new one',
      );
    }

    return this.resetPasswordService.deleteResetPasswordToken(verify.id);
  }
}
