import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../libs/common/src/decorators';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async authorCreate(@Body() dto: AuthorDto) {
    const author = await this.authorService.findAuthorByName(
      dto.firstName,
      dto.lastName,
    );

    if (author) {
      throw new BadRequestException('This name and lastname is already in use');
    }

    return this.authorService.authorCreate(dto);
  }

  @Get('all')
  async findAllAuthor() {
    return this.authorService.getAllAuthor();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deleteAuthorById(@Param('Id') Id: string) {
    const author = await this.authorService.findAuthorById(Id);

    if (!author) {
      throw new BadRequestException(`There is no author with this ID: ${Id}`);
    }

    return this.authorService.deleteAuthorById(Id);
  }
}
