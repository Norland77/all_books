import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user-create.dto';
import { IJwtPayload } from '../auth/interfaces';
import { UpdateUserDto } from './dto/user-update.dto';

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

  async deleteUserById(Id: string) {
    return await this.userRepository.deleteUserById(Id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async updateUserById(Id: string, dto: UpdateUserDto) {
    return await this.userRepository.updateUserById(Id, dto);
  }
}
