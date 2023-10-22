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
import { BookService } from '../book/book.service';
const REFRESH_TOKEN = 'refreshtoken';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly userService: UserService,
    private readonly bookService: BookService,
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

    const book = await this.bookService.findBookById(bookId);

    if (!book) {
      throw new BadRequestException(
        `There is no books with this ID: ${bookId}`,
      );
    }

    const reviews = await this.bookService.getReviewsById(bookId);

    if (!reviews) {
      throw new BadRequestException(
        `There is no reviews to book with this ID: ${bookId}`,
      );
    }

    const review = await this.reviewsService.findReviewByTitleOrBody(
      dto.title,
      dto.body,
    );

    if (review) {
      throw new BadRequestException('This title or body is already in use');
    }

    const createdReview = await this.reviewsService.createReview(
      dto,
      user.userId,
      bookId,
    );

    if (!createdReview) {
      throw new BadRequestException();
    }

    return this.bookService.setAverageRatingById(bookId);
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

    const createdReview = await this.reviewsService.editReviewById(dto, id);

    if (!createdReview) {
      throw new BadRequestException();
    }

    return this.bookService.setAverageRatingById(review.bookId);
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
