import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GenreService } from './genre.service';
import { GenreDto } from './dto/genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post('create')
  async createGenre(@Body() dto: GenreDto) {
    const genre = await this.genreService.findGenreByName(dto.name);

    if (genre) {
      throw new BadRequestException('This name is already in use');
    }

    return this.genreService.createGenre(dto);
  }

  @Get('get-children/:Id')
  async getChildrenGenre(@Param('Id') Id: string) {
    const genre = await this.genreService.findGenreById(Id);

    if (!genre) {
      throw new BadRequestException(`There is no genre with this id: ${Id}`);
    }

    return this.genreService.getChildrenGenre(Id);
  }

  @Delete('delete/:Id')
  async deleteGenreById(@Param('Id') Id: string) {
    const genre = await this.genreService.findGenreById(Id);

    if (!genre) {
      throw new BadRequestException(`There is no genre with this id: ${Id}`);
    }

    return this.genreService.deleteGenreById(Id);
  }

  @Get('all')
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }
}
