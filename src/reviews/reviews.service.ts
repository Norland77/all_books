import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  async findReviewByTitleOrBody(title: string, body: string) {
    return this.reviewsRepository.findReviewByTitleOrBody(title, body);
  }

  createReview(dto: ReviewDto, userId: string, bookId: string) {
    return this.reviewsRepository.createReview(dto, userId, bookId);
  }

  async findReviewById(id: string) {
    return this.reviewsRepository.findReviewById(id);
  }

  editReviewById(dto: ReviewDto, id: string) {
    return this.reviewsRepository.editReviewById(dto, id);
  }

  deleteReviewById(id: string) {
    return this.reviewsRepository.deleteReviewById(id);
  }

  async setReviewRating(id: string) {
    let reviewRating: number = 0;

    const likesAndDislikes =
      await this.reviewsRepository.getAllLikeDislikesById(id);

    if (!likesAndDislikes) {
      throw new BadRequestException(
        `There is no likes or dislikes to review with this ID: ${id}`,
      );
    }

    const allLikes = likesAndDislikes.likes;

    if (allLikes.length === 0) {
      return { reviewRating: reviewRating };
    }

    for (let i = 0; i < allLikes.length; i++) {
      if (allLikes[i].isLike) {
        reviewRating++;
      } else {
        reviewRating--;
      }
    }

    const newReviewRating = reviewRating.toFixed();

    return this.reviewsRepository.setReviewRating(id, newReviewRating);
  }
}
