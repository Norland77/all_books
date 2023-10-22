import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
} from '@nestjs/common';
import { ReviewsLikeDislikeService } from './reviews-like-dislike.service';
import { ReviewsService } from '../reviews/reviews.service';
import { Cookie } from '../../libs/common/src/decorators';
import { UserService } from '../user/user.service';
const REFRESH_TOKEN = 'refreshtoken';

@Controller('reviews-like-dislike')
export class ReviewsLikeDislikeController {
  constructor(
    private readonly reviewsLikeDislikeService: ReviewsLikeDislikeService,
    private readonly reviewsService: ReviewsService,
    private readonly userService: UserService,
  ) {}

  @Post('like/:Id')
  async likeReviewById(
    @Param('Id') id: string,
    @Cookie(REFRESH_TOKEN) refreshToken: string,
  ) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const review = await this.reviewsService.findReviewById(id);

    if (!review) {
      throw new BadRequestException(`There is no review with this id: ${id}`);
    }

    const like = await this.reviewsLikeDislikeService.findLikeById(
      id,
      user.userId,
    );

    if (!like) {
      const setLike = await this.reviewsLikeDislikeService.likeReviewById(
        id,
        user.userId,
      );
      if (!setLike) {
        throw new BadRequestException();
      }
      return this.reviewsService.setReviewRating(id);
    } else if (!like.isLike) {
      const setDislike =
        await this.reviewsLikeDislikeService.changeLikeOrDislike(
          like.id,
          like.isLike,
        );
      if (!setDislike) {
        throw new BadRequestException();
      }
      return this.reviewsService.setReviewRating(id);
    } else {
      throw new BadRequestException('You have already liked');
    }
  }

  @Post('dislike/:Id')
  async dislikeReviewById(
    @Param('Id') id: string,
    @Cookie(REFRESH_TOKEN) refreshToken: string,
  ) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const review = await this.reviewsService.findReviewById(id);

    if (!review) {
      throw new BadRequestException(`There is no review with this id: ${id}`);
    }

    const dislike = await this.reviewsLikeDislikeService.findDislikeById(
      id,
      user.userId,
    );

    if (!dislike) {
      const setDislike = await this.reviewsLikeDislikeService.dislikeReviewById(
        id,
        user.userId,
      );
      if (!setDislike) {
        throw new BadRequestException();
      }
      return this.reviewsService.setReviewRating(id);
    } else if (dislike.isLike) {
      const setLike = await this.reviewsLikeDislikeService.changeLikeOrDislike(
        dislike.id,
        dislike.isLike,
      );
      if (!setLike) {
        throw new BadRequestException();
      }
      return this.reviewsService.setReviewRating(id);
    } else {
      throw new BadRequestException('You have already disliked');
    }
  }

  @Delete('delete/:Id')
  async deleteLikeOrDislikeById(@Param('Id') id: string) {
    const likeOrDislike =
      await this.reviewsLikeDislikeService.findLikeOrDislikeByLikeOrDislikeId(
        id,
      );

    if (!likeOrDislike) {
      throw new BadRequestException(
        `There is no like or dislike with this id: ${id}`,
      );
    }

    return this.reviewsLikeDislikeService.deleteLikeOrDislikeById(id);
  }
}
