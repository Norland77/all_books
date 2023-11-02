import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { Cookie } from '../../libs/common/src/decorators';
import { UserService } from '../user/user.service';
import { ShelfService } from '../shelf/shelf.service';
import { $Enums } from '../../prisma/generated/client';
import Status = $Enums.Status;
const REFRESH_TOKEN = 'refreshtoken111';
@Controller('user-book')
export class UserBookController {
  constructor(
    private readonly userBookService: UserBookService,
    private readonly userService: UserService,
    private readonly shelfService: ShelfService,
  ) {}

  @Post('add/:Id')
  async addBookToUser(
    @Param('Id') bookId: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const user = await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!user) {
      throw new BadRequestException();
    }

    const userBook = await this.userBookService.findUserBookByUserBookId(
      bookId,
      user.userId,
    );

    if (userBook) {
      throw new BadRequestException(
        'This book has already been added to your library',
      );
    }

    return this.userBookService.addBookToUser(bookId, user.userId);
  }

  @Delete('delete/:Id')
  async deleteUserBookById(
    @Param('Id') bookId: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const user = await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!user) {
      throw new BadRequestException();
    }

    const userBook = await this.userBookService.findUserBookByUserBookId(
      bookId,
      user.userId,
    );

    if (!userBook) {
      throw new BadRequestException(
        `There is no user-book with this id: ${bookId}`,
      );
    }

    return this.userBookService.deleteUserBookById(userBook.id);
  }

  @Get('all/:Id')
  async getAllBookByUserId(@Param('Id') id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new BadRequestException(`There is no user with this id: ${id}`);
    }

    return this.userBookService.getAllBookByUserId(id);
  }

  @Put('add-to-shelf/:BookId/:ShelfId')
  async addBookToShelfById(
    @Param('BookId') bookId: string,
    @Param('ShelfId') shelfId: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const book = await this.userBookService.findUserBookById(bookId);

    if (!book) {
      throw new BadRequestException(
        `There is no user-book with this id: ${bookId}`,
      );
    }

    const shelf = await this.shelfService.findShelfById(shelfId);

    if (!shelf) {
      throw new BadRequestException(
        `There is no shelf with this id: ${shelfId}`,
      );
    }

    if (!shelf.isCustom) {
      throw new BadRequestException('This shelf is not custom');
    }

    const user = await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!user) {
      throw new BadRequestException();
    }

    if (shelf.userId !== user.userId) {
      throw new BadRequestException(
        'It is impossible to add a book not to your shelf',
      );
    }

    return this.userBookService.addBookToShelfById(bookId, shelfId);
  }

  @Put('change-shelf-bystatus/:Id/:Name')
  async changeShelfByStatus(
    @Param('Id') bookId: string,
    @Param('Name') statusName: string,
  ) {
    const book = await this.userBookService.findUserBookById(bookId);

    if (!book) {
      throw new BadRequestException(
        `There is no user-book with this id: ${bookId}`,
      );
    }

    if (
      statusName !== Status.READ &&
      statusName !== Status.CURRENTLY_READING &&
      statusName !== Status.WANT_TO_READ
    ) {
      throw new BadRequestException('There is no status with this name');
    }

    return this.userBookService.changeStatusBook(bookId, statusName);
  }
}
