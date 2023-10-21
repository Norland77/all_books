import { Injectable } from '@nestjs/common';
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
}
