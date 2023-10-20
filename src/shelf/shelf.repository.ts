import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ShelfDto } from './dto/shelf.dto';

@Controller('shelf')
export class ShelfRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findShelfByName(name: string) {
    return this.prismaService.shelf.findFirst({
      where: {
        name,
      },
    });
  }

  createShelf(dto: ShelfDto, userId: string) {
    return this.prismaService.shelf.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  findShelfById(id: string) {
    return this.prismaService.shelf.findFirst({
      where: {
        id,
      },
    });
  }

  deleteShelfById(id: string) {
    return this.prismaService.shelf.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
