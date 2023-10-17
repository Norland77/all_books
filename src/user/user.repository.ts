import { CreateUserDto } from './dto/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

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

  async findUserById(Id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: Id,
      },
    });

    if (user) {
      const role = await this.prismaService.role.findFirst({
        where: {
          id: user.roleId,
        },
      });
      const gender = await this.prismaService.gender.findFirst({
        where: {
          id: user.genderId,
        },
      });
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        avatar: user.avatar,
        role: {
          id: role?.id,
          name: role?.name,
        },
        gender: {
          id: gender?.id,
          name: gender?.name,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } else {
      return null;
    }
  }

  deleteUserById(Id: string) {
    return this.prismaService.user.delete({
      where: {
        id: Id,
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      const role = await this.prismaService.role.findFirst({
        where: {
          id: user.roleId,
        },
      });
      const gender = await this.prismaService.gender.findFirst({
        where: {
          id: user.genderId,
        },
      });
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        avatar: user.avatar,
        role: {
          id: role?.id,
          name: role?.name,
        },
        gender: {
          id: gender?.id,
          name: gender?.name,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } else {
      return null;
    }
  }
}
