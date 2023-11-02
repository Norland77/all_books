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

  refreshtoken111s(refreshtoken111: string, agent: string) {
    return this.authRepository.refreshtoken111s(refreshtoken111, agent);
  }

  async logout(refreshtoken111: string) {
    return this.authRepository.logout(refreshtoken111);
  }

  async googleAuth(email: string, agent: string) {
    return this.authRepository.googleAuth(email, agent);
  }
}
