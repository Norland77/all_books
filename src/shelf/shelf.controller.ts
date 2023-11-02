import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfDto } from './dto/shelf.dto';
import { Cookie } from '../../libs/common/src/decorators';
import { UserService } from '../user/user.service';

const REFRESH_TOKEN = 'refreshtoken111';

@Controller('shelf')
export class ShelfController {
  constructor(
    private readonly shelfService: ShelfService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  async createShelf(
    @Body() dto: ShelfDto,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const user = await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!user) {
      throw new BadRequestException();
    }

    const shelf = await this.shelfService.findShelfByName(dto.name);

    if (shelf) {
      throw new BadRequestException('This name is already in use');
    }

    return this.shelfService.createShelf(dto, user.userId);
  }

  @Delete('delete/:Id')
  async deleteShelfById(
    @Param('Id') id: string,
    @Cookie(REFRESH_TOKEN) refreshtoken111: string,
  ) {
    const user = await this.userService.findUserByrefreshtoken111(refreshtoken111);

    if (!user) {
      throw new BadRequestException();
    }

    const shelf = await this.shelfService.findShelfById(id);

    if (!shelf) {
      throw new BadRequestException(`There is no shelf with this id: ${id}`);
    }

    if (user.userId !== shelf.userId) {
      throw new BadRequestException(
        `You cannot remove a shelf that is not yours`,
      );
    }

    return this.shelfService.deleteShelfById(id);
  }

  @Get('all/:Id')
  async getAllShelfsByUserId(@Param('Id') id: string) {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new BadRequestException(`User with id: ${id} does not exist`);
    }

    return this.shelfService.getAllShelfsByUserId(id);
  }

  @Get('books/:Id')
  async getBooksOnShelf(@Param('Id') id: string) {
    const shelf = await this.shelfService.findShelfById(id);

    if (!shelf) {
      throw new BadRequestException(`There is no shelf with this id: ${id}`);
    }

    return this.shelfService.getBooksOnShelf(id);
  }
}
