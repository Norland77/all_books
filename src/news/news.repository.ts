import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findNewByTitleOrDesc(title: string, description: string) {
    return this.prismaService.news.findFirst({
      where: {
        OR: [{ title }, { description }],
      },
    });
  }

  createNews(dto: NewsDto) {
    return this.prismaService.news.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  findNewById(id: string) {
    return this.prismaService.news.findFirst({
      where: {
        id,
      },
    });
  }

  editNew(id: string, dto: NewsDto) {
    return this.prismaService.news.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  deleteNewById(id: string) {
    return this.prismaService.news.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  getAllNews() {
    return this.prismaService.news.findMany();
  }
}
