import { Injectable } from '@nestjs/common';
import { PublisherRepository } from './publisher.repository';
import { PublisherDto } from "./dto/publisher.dto";

@Injectable()
export class PublisherService {
  constructor(private readonly publisherRepository: PublisherRepository) {}

  async findPublisherByName(name: string) {
    return this.publisherRepository.findPublisherByName(name);
  }

  createPublisher(dto: PublisherDto) {
    return this.publisherRepository.createPublisher(dto);
  }

  getAllPublisher() {
    return this.publisherRepository.getAllPublisher()
  }

  async findPublisherById(Id: string) {
    return this.publisherRepository.findPublisherById(Id);
  }

  deletePublisherById(Id: string) {
    return this.publisherRepository.deletePublisherById(Id);
  }
}
