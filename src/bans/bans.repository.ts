import { BadRequestException, Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateBansDto } from './dto/bans.dto';
import { Bans } from '../../prisma/generated/client';

@Controller('user')
export class BansRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async banUserById(Id: string, dto: CreateBansDto) {
    const ban = await this.prismaService.bans.create({
      data: {
        userId: Id,
        reason: dto.reason,
      },
    });

    if (!ban) {
      throw new BadRequestException();
    }

    return this.prismaService.user.update({
      where: {
        id: Id,
      },
      data: {
        isBanned: true,
      },
      select: {
        isBanned: true,
      },
    });
  }

  async unbannedUserById(Id: string, lastBan: Bans) {
    const ban = await this.prismaService.bans.update({
      where: {
        id: lastBan.id,
      },
      data: {
        unbannedAt: new Date(),
      },
    });

    if (!ban) {
      throw new BadRequestException();
    }

    return this.prismaService.user.update({
      where: {
        id: Id,
      },
      data: {
        isBanned: false,
      },
      select: {
        isBanned: true,
      },
    });
  }

  findLastBan(Id: string) {
    return this.prismaService.bans.findFirst({
      where: {
        userId: Id,
        unbannedAt: null,
      },
    });
  }
}
