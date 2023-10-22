import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Controller('reviews')
export class ReviewsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findReviewByTitleOrBody(title: string, body: string) {
    return this.prismaService.reviews.findFirst({
      where: {
        OR: [{ title }, { body }],
      },
    });
  }

  createReview(dto: ReviewDto, userId: string, bookId: string) {
    return this.prismaService.reviews.create({
      data: {
        rating: dto.rating,
        title: dto.title,
        body: dto.body,
        bookId,
        userId,
      },
    });
  }

  findReviewById(id: string) {
    return this.prismaService.reviews.findFirst({
      where: {
        id,
      },
    });
  }

  editReviewById(dto: ReviewDto, id: string) {
    return this.prismaService.reviews.update({
      where: {
        id,
      },
      data: {
        rating: dto.rating,
        body: dto.body,
        title: dto.title,
      },
    });
  }

  deleteReviewById(id: string) {
    return this.prismaService.reviews.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  async getAllLikeDislikesById(id: string) {
    return this.prismaService.reviews.findFirst({
      where: {
        id,
      },
      select: {
        likes: true,
      },
    });
  }

  setReviewRating(id: string, reviewRating: string) {
    return this.prismaService.reviews.update({
      where: {
        id,
      },
      data: {
        reviewRating: reviewRating,
      },
    });
  }
}
