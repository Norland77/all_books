import { Injectable } from '@nestjs/common';
import { ShelfRepository } from './shelf.repository';
import { ShelfDto } from './dto/shelf.dto';

@Injectable()
export class ShelfService {
  constructor(private readonly shelfRepository: ShelfRepository) {}

  async findShelfByName(name: string) {
    return this.shelfRepository.findShelfByName(name);
  }

  createShelf(dto: ShelfDto, userId: string) {
    return this.shelfRepository.createShelf(dto, userId);
  }

  async findShelfById(id: string) {
    return this.shelfRepository.findShelfById(id);
  }

  deleteShelfById(id: string) {
    return this.shelfRepository.deleteShelfById(id);
  }

  getAllShelfsByUserId(id: string) {
    return this.shelfRepository.getAllShelfsByUserId(id);
  }
}
