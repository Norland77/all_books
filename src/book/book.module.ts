import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { AuthorModule } from '../author/author.module';
import { GenreModule } from '../genre/genre.module';
import { AwardsModule } from '../awards/awards.module';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  providers: [BookService, BookRepository],
  controllers: [BookController, BookRepository],
  imports: [AuthorModule, GenreModule, AwardsModule, PublisherModule],
  exports: [BookService],
})
export class BookModule {}
