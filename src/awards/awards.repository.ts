import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AwardsDto } from './dto/awards.dto';

@Controller('awards')
export class AwardsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAwardByName(name: string) {
    return this.prismaService.awards.findFirst({
      where: {
        name,
      },
    });
  }

  createAward(dto: AwardsDto) {
    return this.prismaService.awards.create({
      data: {
        name: dto.name,
        description: dto.description,
        date: dto.date,
      },
    });
  }

  getAllAwards() {
    return this.prismaService.awards.findMany();
  }

  findAwardById(id: string) {
    return this.prismaService.awards.findFirst({
      where: {
        id,
      },
    });
  }

  deleteAwardById(id: string) {
    return this.prismaService.awards.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }
}
