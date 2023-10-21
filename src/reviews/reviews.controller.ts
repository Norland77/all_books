import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto/review.dto';
import { Cookie } from '../../libs/common/src/decorators';
import { UserService } from '../user/user.service';
const REFRESH_TOKEN = 'refreshtoken';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly userService: UserService,
  ) {}

  @Post('create/:Id')
  async createReview(
    @Body() dto: ReviewDto,
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Param('Id') bookId: string,
  ) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const review = await this.reviewsService.findReviewByTitleOrBody(
      dto.title,
      dto.body,
    );

    if (review) {
      throw new BadRequestException('This title or body is already in use');
    }

    return this.reviewsService.createReview(dto, user.userId, bookId);
  }

  @Put('update/:Id')
  async editReviewById(
    @Body() dto: ReviewDto,
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Param('Id') id: string,
  ) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const review = await this.reviewsService.findReviewById(id);

    if (!review) {
      throw new BadRequestException(`There is no review with this id: ${id}`);
    }

    if (user.userId !== review.userId) {
      throw new BadRequestException(
        'You cannot change a review that is not yours.',
      );
    }

    return this.reviewsService.editReviewById(dto, id);
  }

  @Delete('delete/:Id')
  async deleteReviewById(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Param('Id') id: string,
  ) {
    const user = await this.userService.findUserByRefreshToken(refreshToken);

    if (!user) {
      throw new BadRequestException();
    }

    const review = await this.reviewsService.findReviewById(id);

    if (!review) {
      throw new BadRequestException(`There is no review with this id: ${id}`);
    }

    if (user.userId !== review.userId) {
      throw new BadRequestException(
        'You cannot delete a review that is not yours.',
      );
    }

    return this.reviewsService.deleteReviewById(id);
  }
}
