import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { PublisherDto } from './dto/publisher.dto';

@Controller('publisher')
export class PublisherRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findPublisherByName(name: string) {
    return this.prismaService.publisher.findFirst({
      where: {
        name,
      },
    });
  }

  createPublisher(dto: PublisherDto) {
    return this.prismaService.publisher.create({
      data: {
        name: dto.name,
        Country: dto.country,
      },
    });
  }

  getAllPublisher() {
    return this.prismaService.publisher.findMany();
  }

  findPublisherById(Id: string) {
    return this.prismaService.publisher.findFirst({
      where: {
        id: Id,
      },
    });
  }

  deletePublisherById(Id: string) {
    return this.prismaService.publisher.delete({
      where: {
        id: Id,
      },
      select: {
        id: true,
      },
    });
  }
}
