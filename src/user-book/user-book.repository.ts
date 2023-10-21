import { BadRequestException, Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Status } from '../../prisma/generated/client';

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

  async changeStatusBook(bookId: string, statusName: string) {
    const newStatus =
      statusName === 'WANT_TO_READ'
        ? Status.WANT_TO_READ
        : statusName === 'READ'
        ? Status.READ
        : statusName === 'CURRENTLY_READING'
        ? Status.CURRENTLY_READING
        : undefined;

    if (newStatus === undefined) {
      throw new BadRequestException('There is no status with this name');
    }

    const currentStatus = await this.prismaService.userBooks.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!currentStatus) {
      throw new BadRequestException('There is no user-book with this id');
    }

    if (newStatus === currentStatus.status) {
      throw new BadRequestException('This book already has this status set');
    }

    const oldStatusName =
      currentStatus?.status === 'WANT_TO_READ'
        ? 'В планах'
        : currentStatus?.status === 'READ'
        ? 'Прочитав'
        : currentStatus?.status === 'CURRENTLY_READING'
        ? 'Читаю'
        : undefined;

    const newStatusName =
      statusName === 'WANT_TO_READ'
        ? 'В планах'
        : statusName === 'READ'
        ? 'Прочитав'
        : statusName === 'CURRENTLY_READING'
        ? 'Читаю'
        : undefined;

    const newShelf = await this.prismaService.shelf.findFirst({
      where: {
        AND: [{ name: newStatusName }, { userId: currentStatus?.userId }],
      },
    });

    if (!newShelf) {
      throw new BadRequestException('There is no newShelf with this name');
    }

    const currentShelf = await this.prismaService.shelf.findFirst({
      where: {
        AND: [{ name: oldStatusName }, { userId: currentStatus?.userId }],
      },
    });

    if (!currentShelf) {
      throw new BadRequestException('There is no currentShelf with this name');
    }

    return this.prismaService.userBooks.update({
      where: {
        id: bookId,
      },
      data: {
        status: newStatus,
        shelf: {
          disconnect: {
            id: currentShelf.id,
          },
          connect: {
            id: newShelf.id,
          },
        },
      },
      include: {
        shelf: true,
      },
    });
  }
}
