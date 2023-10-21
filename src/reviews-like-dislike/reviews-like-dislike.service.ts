import { Injectable } from '@nestjs/common';
import { ReviewsLikeDislikeRepository } from './reviews-like-dislike.repository';

@Injectable()
export class ReviewsLikeDislikeService {
  constructor(
    private readonly reviewsLikeDislikeRepository: ReviewsLikeDislikeRepository,
  ) {}

  likeReviewById(id: string, userId: string) {
    return this.reviewsLikeDislikeRepository.likeReviewById(id, userId);
  }

  async findLikeById(id: string, userId: string) {
    return this.reviewsLikeDislikeRepository.findLikeById(id, userId);
  }

  async findDislikeById(id: string, userId: string) {
    return this.reviewsLikeDislikeRepository.findDislikeById(id, userId);
  }

  dislikeReviewById(id: string, userId: string) {
    return this.reviewsLikeDislikeRepository.dislikeReviewById(id, userId);
  }

  findLikeOrDislikeById(id: string, userId: string) {
    return this.reviewsLikeDislikeRepository.findLikeOrDislikeById(id, userId);
  }

  changeLikeOrDislike(id: string, currentGrade: boolean) {
    return this.reviewsLikeDislikeRepository.changeLikeOrDislike(
      id,
      currentGrade,
    );
  }

  async findLikeOrDislikeByLikeOrDislikeId(id: string) {
    return this.reviewsLikeDislikeRepository.findLikeOrDislikeByLikeOrDislikeId(id);
  }

  deleteLikeOrDislikeById(id: string) {
    return this.reviewsLikeDislikeRepository.deleteLikeOrDislikeById(id);
  }
}
