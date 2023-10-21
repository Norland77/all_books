import { Module } from '@nestjs/common';
import { ReviewsLikeDislikeService } from './reviews-like-dislike.service';
import { ReviewsLikeDislikeController } from './reviews-like-dislike.controller';
import { ReviewsLikeDislikeRepository } from './reviews-like-dislike.repository';
import { ReviewsModule } from '../reviews/reviews.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ReviewsLikeDislikeService, ReviewsLikeDislikeRepository],
  controllers: [ReviewsLikeDislikeController, ReviewsLikeDislikeRepository],
  imports: [ReviewsModule, UserModule],
})
export class ReviewsLikeDislikeModule {}
