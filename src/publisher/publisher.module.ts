import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { PublisherRepository } from './publisher.repository';

@Module({
  providers: [PublisherService, PublisherRepository],
  controllers: [PublisherController, PublisherRepository],
  exports: [PublisherService],
})
export class PublisherModule {}
