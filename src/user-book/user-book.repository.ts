import { BadRequestException, Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Shelf } from '../../prisma/generated/client';

@Controller('user-book')
export class UserBookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUserBookByUserBookId(bookId: string, userId: string) {
    return this.prismaService.userBooks.findFirst({
      where: {
        AND: [{ userId }, { bookId }],
      },
    });
  }

  async addBookToUser(bookId: string, userId: string) {
    const userShelf = await this.prismaService.shelf.findFirst({
      where: {
        AND: [{ userId }, { name: 'В планах' }],
      },
    });

    if (!userShelf) {
      throw new BadRequestException();
    }

    return this.prismaService.userBooks.create({
      data: {
        userId,
        bookId,
        status: 'WANT_TO_READ',
        shelf: {
          connect: {
            id: userShelf.id,
          },
        },
      },
    });
  }

  deleteUserBookById(id: string) {
    return this.prismaService.userBooks.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  getAllBookByUserId(id: string) {
    return this.prismaService.userBooks.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        status: true,
        shelf: true,
        addedAt: true,
        readEndAt: true,
        book: true,
      },
    });
  }

  findUserBookById(bookId: string) {
    return this.prismaService.userBooks.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  addBookToShelfById(bookId: string, shelfId: string) {
    return this.prismaService.userBooks.update({
      where: {
        id: bookId,
      },
      data: {
        shelf: {
          connect: {
            id: shelfId,
          },
        },
      },
    });
  }
}
