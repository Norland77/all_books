import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user.dto';
import { IJwtPayload } from '../auth/interfaces';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByName(username: string, email: string) {
    return await this.userRepository.getUserByName(username, email);
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.createUser(dto);
  }

  async findUserById(Id: string) {
    return await this.userRepository.findUserById(Id);
  }

  async deleteUserById(Id: string, user: IJwtPayload) {
    return await this.userRepository.deleteUserById(Id, user);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }
}
