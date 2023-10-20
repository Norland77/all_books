import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Author, Awards, Genre } from '../../prisma/generated/client';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findBookByIsbn(isbn: string) {
    return this.bookRepository.findBookByIsbn(isbn);
  }

  createBook(
    dto: BookDto,
    publisherId: string,
    authors: Author[],
    genres: Genre[],
    awards?: Awards[],
  ) {
    return this.bookRepository.createBook(
      dto,
      publisherId,
      authors,
      genres,
      awards,
    );
  }

  getAllBooks() {
    return this.bookRepository.getAllBooks();
  }

  async findBookById(id: string) {
    return this.bookRepository.findBookById(id);
  }

  deleteBookById(id: string) {
    return this.bookRepository.deleteBookById(id);
  }

  getBooksByAuthor(id: string) {
    return this.bookRepository.getBooksByAuthor(id);
  }

  getBooksByGenre(id: string) {
    return this.bookRepository.getBooksByGenre(id);
  }

  getBooksByAward(id: string) {
    return this.bookRepository.getBooksByAward(id);
  }
}
