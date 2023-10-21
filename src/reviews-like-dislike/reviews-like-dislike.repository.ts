import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Controller('reviews-like-dislike')
export class ReviewsLikeDislikeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  likeReviewById(id: string, userId: string) {
    return this.prismaService.reviewsLikeDislike.create({
      data: {
        userId,
        reviewId: id,
        isLike: true,
      },
    });
  }

  findLikeById(id: string, userId: string) {
    return this.prismaService.reviewsLikeDislike.findFirst({
      where: {
        AND: [{ userId }, { reviewId: id }],
      },
    });
  }

  findDislikeById(id: string, userId: string) {
    return this.prismaService.reviewsLikeDislike.findFirst({
      where: {
        AND: [{ userId }, { reviewId: id }],
      },
    });
  }

  dislikeReviewById(id: string, userId: string) {
    return this.prismaService.reviewsLikeDislike.create({
      data: {
        userId,
        reviewId: id,
        isLike: false,
      },
    });
  }

  findLikeOrDislikeById(id: string, userId: string) {
    return this.prismaService.reviewsLikeDislike.findFirst({
      where: {
        AND: [{ userId }, { reviewId: id }],
      },
    });
  }

  changeLikeOrDislike(id: string, currentGrade: boolean) {
    return this.prismaService.reviewsLikeDislike.update({
      where: {
        id,
      },
      data: {
        isLike: !currentGrade,
      },
    });
  }

  findLikeOrDislikeByLikeOrDislikeId(id: string) {
    return this.prismaService.reviewsLikeDislike.findFirst({
      where: {
        id,
      },
    });
  }

  deleteLikeOrDislikeById(id: string) {
    return this.prismaService.reviewsLikeDislike.delete({
      where: {
        id,
      },
    });
  }
}
