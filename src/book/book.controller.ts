import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { AuthorService } from '../author/author.service';
import { GenreService } from '../genre/genre.service';
import { AwardsService } from '../awards/awards.service';
import { $Enums, Author, Awards, Genre } from '../../prisma/generated/client';
import { PublisherService } from '../publisher/publisher.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../libs/common/src/decorators';
import UserRole = $Enums.UserRole;

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
    private readonly awardsService: AwardsService,
    private readonly publisherService: PublisherService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createBook(@Body() dto: BookDto) {
    const book = await this.bookService.findBookByIsbn(dto.isbn);

    if (book) {
      throw new BadRequestException('This ISBN is already in use');
    }

    const authors: Author[] = [];
    for (let i = 0; i < dto.authors.length; i++) {
      const author = await this.authorService.findAuthorByName(
        dto.authors[i].firstName,
        dto.authors[i].lastName,
      );

      if (!author) {
        throw new BadRequestException('There is no author with that name');
      }

      authors.push(author);
    }

    const genres: Genre[] = [];
    for (let i = 0; i < dto.genres.length; i++) {
      const genre = await this.genreService.findGenreByName(dto.genres[i].name);

      if (!genre) {
        throw new BadRequestException('There is no genre with that name');
      }

      genres.push(genre);
    }

    const awards: Awards[] = [];
    if (dto.awards !== undefined) {
      for (let i = 0; i < dto.awards.length; i++) {
        const award = await this.awardsService.findAwardByName(
          dto.awards[i].name,
        );

        if (!award) {
          throw new BadRequestException('There is no award with that name');
        }

        awards.push(award);
      }
    }

    const publisher = await this.publisherService.findPublisherByName(
      dto.publisher,
    );

    if (!publisher) {
      throw new BadRequestException('There is no publisher with that name');
    }

    return this.bookService.createBook(
      dto,
      publisher.id,
      authors,
      genres,
      awards,
    );
  }

  @Get('all')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deleteBookById(@Param('Id') id: string) {
    const book = await this.bookService.findBookById(id);

    if (!book) {
      throw new BadRequestException(`There is no books with this ID: ${id}`);
    }

    return this.bookService.deleteBookById(id);
  }

  @Get('by-author/first-name=:FirstName&last-name=:LastName')
  async getBooksByAuthor(
    @Param('FirstName') firstName: string,
    @Param('LastName') lastName: string,
  ) {
    const author = await this.authorService.findAuthorByName(
      firstName,
      lastName,
    );

    if (!author) {
      throw new BadRequestException('There is no author with that name');
    }

    return this.bookService.getBooksByAuthor(author.id);
  }

  @Get('by-genre/genre=:Genre')
  async getBooksByGenre(@Param('Genre') genreName: string) {
    const genre = await this.genreService.findGenreByName(genreName);

    if (!genre) {
      throw new BadRequestException('There is no genre with that name');
    }

    return this.bookService.getBooksByGenre(genre.id);
  }

  @Get('by-award/award=:Award')
  async getBooksByAward(@Param('Award') awardName: string) {
    const award = await this.awardsService.findAwardByName(awardName);

    if (!award) {
      throw new BadRequestException('There is no genre with that name');
    }

    return this.bookService.getBooksByAward(award.id);
  }

  @Get('/:Id')
  async getBookById(@Param('Id') id: string) {
    const book = await this.bookService.findBookById(id);

    if (!book) {
      throw new BadRequestException(`There is no books with this ID: ${id}`);
    }

    return book;
  }

  @Put('average/:Id')
  async setAverageRatingById(@Param('Id') id: string) {
    const book = await this.bookService.findBookById(id);

    if (!book) {
      throw new BadRequestException(`There is no books with this ID: ${id}`);
    }

    return this.bookService.setAverageRatingById(id);
  }
}
