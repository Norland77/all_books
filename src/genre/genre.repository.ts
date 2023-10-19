import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GenreDto } from './dto/genre.dto';

@Controller('genre')
export class GenreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findGenreByName(name: string) {
    return this.prismaService.genre.findFirst({
      where: {
        name,
      },
    });
  }

  createGenre(dto: GenreDto) {
    return this.prismaService.genre.create({
      data: {
        name: dto.name,
        description: dto.description,
        parentId: dto.parrentId,
      },
    });
  }

  findGenreById(Id: string) {
    return this.prismaService.genre.findFirst({
      where: {
        id: Id,
      },
    });
  }

  getChildrenGenre(Id: string) {
    return this.prismaService.genre.findMany({
      where: {
        parentId: Id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  deleteGenreById(Id: string) {
    return this.prismaService.genre.delete({
      where: {
        id: Id,
      },
      select: {
        id: true,
      },
    });
  }

  getAllGenres() {
    return this.prismaService.genre.findMany();
  }
}
