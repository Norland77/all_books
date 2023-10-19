import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAuthorByName(firstName: string, lastName: string) {
    return this.prismaService.author.findFirst({
      where: {
        AND: [{ firstName }, { lastName }],
      },
    });
  }

  authorCreate(dto: AuthorDto) {
    return this.prismaService.author.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        bio: dto.bio,
        country: dto.country,
        dateOfBirth: dto.dateOfBirth,
        image: dto.image,
      },
    });
  }

  getAllAuthor() {
    return this.prismaService.author.findMany();
  }

  findAuthorById(Id: string) {
    return this.prismaService.author.findFirst({
      where: {
        id: Id,
      },
    });
  }

  deleteAuthorById(Id: string) {
    return this.prismaService.author.delete({
      where: {
        id: Id,
      },
      select: {
        id: true,
      },
    });
  }
}
