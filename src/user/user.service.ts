import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { GenderService } from '../gender/gender.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly genderService: GenderService,
  ) {}

  async getUserByName(username: string, email: string) {
    return this.userRepository.getUserByName(username, email);
  }

  async createUser(dto: CreateUserDto) {
    const gender = await this.genderService.findGenderByName(dto.genderName);

    if (!gender) {
      throw new BadRequestException(
        `No gender with this name: ${dto.genderName}`,
      );
    }

    return this.userRepository.createUser(dto, gender.id);
  }

  async findUserById(Id: string) {
    return await this.userRepository.findUserById(Id);
  }

  async deleteUserById(Id: string) {
    return this.userRepository.deleteUserById(Id);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async updateUserById(Id: string, dto: UpdateUserDto) {
    const gender = await this.genderService.findGenderByName(dto.genderName);

    if (!gender) {
      throw new BadRequestException(
        `No gender with this name: ${dto.genderName}`,
      );
    }

    return await this.userRepository.updateUserById(Id, dto, gender.id);
  }

  async findUserByrefreshtoken111(token: string) {
    return this.userRepository.findUserByrefreshtoken111(token);
  }
}
