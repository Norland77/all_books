import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreRepository } from './genre.repository';

@Module({
  providers: [GenreService, GenreRepository],
  controllers: [GenreController, GenreRepository],
  exports: [GenreService],
})
export class GenreModule {}
