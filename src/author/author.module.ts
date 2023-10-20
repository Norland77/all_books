import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';

@Module({
  providers: [AuthorService, AuthorRepository],
  controllers: [AuthorController, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
