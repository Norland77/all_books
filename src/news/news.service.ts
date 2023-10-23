import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { NewsDto } from "./dto/news.dto";

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}


  findNewByTitleOrDesc(title: string, description: string) {
    return this.newsRepository.findNewByTitleOrDesc(title, description);
  }

  createNews(dto: NewsDto) {
    return this.newsRepository.createNews(dto);
  }

  async findNewById(id: string) {
    return this.newsRepository.findNewById(id);
  }

  editNew(id: string, dto: NewsDto) {
    return this.newsRepository.editNew(id, dto);
  }

  deleteNewById(id: string) {
    return this.newsRepository.deleteNewById(id);
  }

  getAllNews() {
    return this.newsRepository.getAllNews();
  }
}
