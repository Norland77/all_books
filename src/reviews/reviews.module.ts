import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ReviewsService, ReviewsRepository],
  controllers: [ReviewsController, ReviewsRepository],
  imports: [UserModule],
})
export class ReviewsModule {}
