import { Injectable } from '@nestjs/common';
import { GenreRepository } from "./genre.repository";
import { GenreDto } from "./dto/genre.dto";

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findGenreByName(name: string) {
    return this.genreRepository.findGenreByName(name);
  }

  createGenre(dto: GenreDto) {
    return this.genreRepository.createGenre(dto);
  }

  async findGenreById(Id: string) {
    return this.genreRepository.findGenreById(Id);
  }

  getChildrenGenre(Id: string) {
    return this.genreRepository.getChildrenGenre(Id);
  }

  deleteGenreById(Id: string) {
    return this.genreRepository.deleteGenreById(Id);
  }
}
