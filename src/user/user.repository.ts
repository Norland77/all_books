import { User } from '../../prisma/generated/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByName(
    username: string,
    email: string,
  ): Promise<Promise<User> | null> {
    return this.prismaService.user.findFirstOrThrow({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = this.hashPassword(dto.password);
    return this.prismaService.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        first_name: dto.first_name,
        last_name: dto.last_name,
        country: dto.country,
        avatar: dto.avatar,
        gender: {
          connect: {
            id: dto.genderId,
          },
        },
        role: {
          connect: {
            id: dto.roleId,
          },
        },
      },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
