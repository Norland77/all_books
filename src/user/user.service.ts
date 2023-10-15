import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByName(username: string, email: string) {
    return await this.userRepository.getUserByName(username, email);
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.createUser(dto);
  }
}
