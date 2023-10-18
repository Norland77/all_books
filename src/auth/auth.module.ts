import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { options } from './config';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AuthService, AuthRepository, ...STRATEGIES, ...GUARDS],
  controllers: [AuthController, AuthRepository],
  imports: [
    PassportModule,
    JwtModule.registerAsync(options()),
    UserModule,
    HttpModule,
  ],
})
export class AuthModule {}
