import { CreateUserDto } from './dto/user-create.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UpdateUserDto } from './dto/user-update.dto';

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

  createUser(dto: CreateUserDto, genderId: string) {
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
            id: genderId,
          },
        },
        role: dto.role === 'Admin' ? ['USER', 'ADMIN'] : ['USER'],
        provider: dto.provider,
        shelfs: {
          create: [
            { name: 'Читаю', isCustom: false },
            { name: 'Прочитав', isCustom: false },
            { name: 'В планах', isCustom: false },
          ],
        },
      },
    });
  }

  async updateUserById(Id: string, dto: UpdateUserDto, genderId: string) {
    console.log(dto);
    return this.prismaService.user.update({
      where: {
        id: Id,
      },
      data: {
        username: dto.username,
        first_name: dto.first_name,
        last_name: dto.last_name,
        genderId: genderId,
        country: dto.country,
        avatar: dto.avatar,
      },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        gender: true,
        role: true,
        createdAt: true,
        avatar: true,
        country: true,
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
    return this.prismaService.user.findFirst({
      where: {
        id: Id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        gender: true,
        role: true,
        createdAt: true,
        avatar: true,
        country: true,
        isBanned: true,
        Banned: true,
        reviews: true,
        books: true,
        shelfs: true,
        following: true,
      },
    });
  }

  deleteUserById(Id: string) {
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
    return this.prismaService.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        first_name: true,
        last_name: true,
        gender: true,
        role: true,
        createdAt: true,
        avatar: true,
        country: true,
      },
    });
  }

  findUserByrefreshtoken111(token: string) {
    return this.prismaService.token.findFirst({
      where: {
        token,
      },
      select: {
        userId: true,
      },
    });
  }
}
