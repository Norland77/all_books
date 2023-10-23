import {
  BadRequestException,
  Body,
  Controller,
  Delete, Get,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../../libs/common/src/decorators";
import { $Enums } from "../../prisma/generated/client";
import UserRole = $Enums.UserRole;

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createNews(@Body() dto: NewsDto) {
    const news = await this.newsService.findNewByTitleOrDesc(
      dto.title,
      dto.description,
    );

    if (news) {
      throw new BadRequestException(
        `Can't create new with data ${JSON.stringify(dto)}`,
      );
    }

    return this.newsService.createNews(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('edit/:Id')
  async editNew(@Body() dto: NewsDto, @Param('Id') id: string) {
    const news = await this.newsService.findNewById(id);

    if (!news) {
      throw new BadRequestException(`No news with id: ${id}`);
    }

    return this.newsService.editNew(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deleteNewById(@Param('Id') id: string) {
    const news = await this.newsService.findNewById(id);

    if (!news) {
      throw new BadRequestException(`No news with id: ${id}`);
    }

    return this.newsService.deleteNewById(id);
  }

  @Get('all')
  getAllNews() {
    return this.newsService.getAllNews();
  }
}
