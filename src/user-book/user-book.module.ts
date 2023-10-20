import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { UserBookController } from './user-book.controller';
import { UserBookRepository } from './user-book.repository';
import { UserModule } from '../user/user.module';
import { ShelfModule } from '../shelf/shelf.module';

@Module({
  providers: [UserBookService, UserBookRepository],
  controllers: [UserBookController, UserBookRepository],
  imports: [UserModule, ShelfModule],
})
export class UserBookModule {}
