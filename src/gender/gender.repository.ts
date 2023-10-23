import { Controller } from '@nestjs/common';
import { CreateGenderDto } from './dto/gender.dto';
import { PrismaService } from '@prisma/prisma.service';

@Controller('role')
export class GenderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createGender(dto: CreateGenderDto) {
    return this.prismaService.gender.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findGenderById(genderId: string) {
    return this.prismaService.gender.findUnique({
      where: {
        id: genderId,
      },
    });
  }

  deleteGender(id: string) {
    return this.prismaService.gender.delete({
      where: {
        id,
      },
    });
  }

  getAllGender() {
    return this.prismaService.gender.findMany();
  }

  findGenderByName(name: string) {
    return this.prismaService.gender.findFirst({
      where: {
        name,
      },
    });
  }
}
