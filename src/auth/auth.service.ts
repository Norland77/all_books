import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register(dto: RegisterDto) {
    return this.authRepository.register(dto);
  }

  login(dto: LoginDto) {
    return this.authRepository.login(dto);
  }

  refreshTokens(refreshToken: string) {
    return this.authRepository.refreshTokens(refreshToken);
  }
}
