import { BadRequestException, Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { BookDto } from './dto/book.dto';
import { Author, Awards, Genre } from '../../prisma/generated/client';

@Controller('book')
export class BookRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findBookByIsbn(isbn: string) {
    return this.prismaService.book.findFirst({
      where: {
        isbn,
      },
    });
  }

  async createBook(
    dto: BookDto,
    publisherId: string,
    authors: Author[],
    genres: Genre[],
    awards?: Awards[],
  ) {
    const book = await this.prismaService.book.create({
      data: {
        title: dto.title,
        isbn: dto.isbn,
        publisherId,
        binding:
          dto.binding === 'HARDCOVER'
            ? ['HARDCOVER']
            : dto.binding === 'PAPERBACK'
            ? ['PAPERBACK']
            : dto.binding === 'EBOOK'
            ? ['EBOOK']
            : undefined,
        language: dto.language,
        description: dto.description,
        image: dto.image,
        numberOfPages: dto.numberOfPages,
        publicationCountry: dto.publicationCountry,
        publicationDate: dto.publicationDate,
      },
    });

    if (!book) {
      throw new BadRequestException(
        `Failed to create workbook with this data: ${dto}`,
      );
    }

    for (let i = 0; i < authors.length; i++) {
      const bookAuthor = await this.prismaService.book.update({
        where: {
          id: book.id,
        },
        data: {
          authors: {
            connect: {
              id: authors[i]?.id,
            },
          },
        },
      });

      if (!bookAuthor) {
        throw new BadRequestException('Failed to add author to book');
      }
    }

    for (let i = 0; i < genres.length; i++) {
      const bookGenre = await this.prismaService.book.update({
        where: {
          id: book.id,
        },
        data: {
          genres: {
            connect: {
              id: genres[i].id,
            },
          },
        },
      });

      if (!bookGenre) {
        throw new BadRequestException('Failed to add genre to book');
      }
    }
    if (awards !== undefined) {
      for (let i = 0; i < awards.length; i++) {
        const bookAward = await this.prismaService.book.update({
          where: {
            id: book.id,
          },
          data: {
            awards: {
              connect: {
                id: awards[i].id,
              },
            },
          },
        });

        if (!bookAward) {
          throw new BadRequestException('Failed to add award to book');
        }
      }
    }

    return book;
  }

  getAllBooks() {
    return this.prismaService.book.findMany({
      include: {
        awards: true,
        authors: true,
        genres: true,
        reviews: true,
      },
    });
  }

  findBookById(id: string) {
    return this.prismaService.book.findFirst({
      where: {
        id,
      },
    });
  }

  deleteBookById(id: string) {
    return this.prismaService.book.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  getBooksByAuthor(id: string) {
    return this.prismaService.book.findMany({
      where: {
        authors: {
          some: {
            id,
          },
        },
      },
    });
  }

  getBooksByGenre(id: string) {
    return this.prismaService.book.findMany({
      where: {
        genres: {
          some: {
            id,
          },
        },
      },
    });
  }

  getBooksByAward(id: string) {
    return this.prismaService.book.findMany({
      where: {
        awards: {
          some: {
            id,
          },
        },
      },
    });
  }

  getReviewsById(id: string) {
    return this.prismaService.book.findFirst({
      where: {
        id,
      },
      select: {
        reviews: true,
      },
    });
  }

  setAverageRatingById(id: string, averageRatingStr: string) {
    return this.prismaService.book.update({
      where: {
        id,
      },
      data: {
        averageRating: averageRatingStr,
      },
      include: {
        reviews: true,
      },
    });
  }
}
