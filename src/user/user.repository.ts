import { CreateUserDto } from './dto/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import {
  BadRequestException,
  Controller,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { IJwtPayload } from '../auth/interfaces';
/*import { CACHE_MANAGER } from '@nestjs/cache-manager';*/

@Controller('user')
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getUserByName(username: string, email: string) {
    console.log('getUserByName');
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
        role: dto.role === 'Admin' ? ['USER', 'ADMIN'] : ['USER'],
        provider: dto.provider,
      },
    });
  }

  private hashPassword(password: string | undefined) {
    if (!password) {
      return '';
    }
    return hashSync(password, genSaltSync(10));
  }

  async findUserById(Id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: Id,
      },
    });

    if (user) {
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
        role: user.role,
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

  deleteUserById(Id: string, user: IJwtPayload) {
    /*if (user.id !== Id || user.role !== 2) {
      throw new ForbiddenException();
    }*/
    return this.prismaService.user.delete({
      where: {
        id: Id,
      },
      select: {
        id: true,
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
        role: user.role,
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
