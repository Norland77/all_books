import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  register(dto: RegisterDto) {
    return this.authRepository.register(dto);
  }

  login(dto: LoginDto, agent: string) {
    return this.authRepository.login(dto, agent);
  }

  refreshTokens(refreshToken: string, agent: string) {
    return this.authRepository.refreshTokens(refreshToken, agent);
  }

  async logout(refreshToken: string) {
    return this.authRepository.logout(refreshToken);
  }

  async googleAuth(email: string, agent: string) {
    return this.authRepository.googleAuth(email, agent);
  }
}
