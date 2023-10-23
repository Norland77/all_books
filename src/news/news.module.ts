import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';

@Module({
  providers: [NewsService, NewsRepository],
  controllers: [NewsController, NewsRepository],
})
export class NewsModule {}
