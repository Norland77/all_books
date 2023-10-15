import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByName(username: string, email: string) {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
  }

  createUser(dto: CreateUserDto) {
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

  findUserById(Id: number){
    return this.prismaService.user.findFirstOrThrow({
      where: {
        id: Id,
      },
    });
  }

  deleteUserById(Id: number) {
    return this.prismaService.user.delete({
      where: {
        id: Id,
      },
    });
  }
}
