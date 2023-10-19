import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { AuthorDto } from "./dto/author.dto";

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAuthorByName(firstName: string, lastName: string) {
    return this.authorRepository.findAuthorByName(firstName, lastName);
  }

  authorCreate(dto: AuthorDto) {
    return this.authorRepository.authorCreate(dto);
  }

  getAllAuthor() {
    return this.authorRepository.getAllAuthor();
  }

  async findAuthorById(Id: string) {
    return this.authorRepository.findAuthorById(Id);
  }

  deleteAuthorById(Id: string) {
    return this.authorRepository.deleteAuthorById(Id);
  }
}
