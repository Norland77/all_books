import {
  BadRequestException,
  Body,
  Controller,
  Delete, Get,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { NewsService } from './news.service';
import { NewsDto } from './dto/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

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

  @Put('edit/:Id')
  async editNew(@Body() dto: NewsDto, @Param('Id') id: string) {
    const news = await this.newsService.findNewById(id);

    if (!news) {
      throw new BadRequestException(`No news with id: ${id}`);
    }

    return this.newsService.editNew(id, dto);
  }

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
