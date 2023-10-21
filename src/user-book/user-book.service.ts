import { Injectable } from '@nestjs/common';
import { UserBookRepository } from './user-book.repository';
import { Shelf } from "../../prisma/generated/client";

@Injectable()
export class UserBookService {
  constructor(private readonly userBookRepository: UserBookRepository) {}

  async findUserBookByUserBookId(bookId: string, userId: string) {
    return this.userBookRepository.findUserBookByUserBookId(bookId, userId);
  }

  addBookToUser(bookId: string, userId: string) {
    return this.userBookRepository.addBookToUser(bookId, userId);
  }

  deleteUserBookById(id: string) {
    return this.userBookRepository.deleteUserBookById(id);
  }

  getAllBookByUserId(id: string) {
    return this.userBookRepository.getAllBookByUserId(id);
  }

  async findUserBookById(bookId: string) {
    return this.userBookRepository.findUserBookById(bookId);
  }

  addBookToShelfById(bookId: string, shelfId: string) {
    return this.userBookRepository.addBookToShelfById(bookId, shelfId);
  }

  changeStatusBook(bookId: string, statusName: string) {
    return this.userBookRepository.changeStatusBook(bookId, statusName);
  }
}
