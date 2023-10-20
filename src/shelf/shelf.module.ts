import { Module } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { ShelfController } from './shelf.controller';
import { ShelfRepository } from './shelf.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [ShelfService, ShelfRepository],
  controllers: [ShelfController, ShelfRepository],
  imports: [UserModule],
})
export class ShelfModule {}
