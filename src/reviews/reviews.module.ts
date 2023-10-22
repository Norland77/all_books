import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';

@Module({
  providers: [ReviewsService, ReviewsRepository],
  controllers: [ReviewsController, ReviewsRepository],
  imports: [UserModule, BookModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
