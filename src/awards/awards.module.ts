import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { AwardsRepository } from './awards.repository';

@Module({
  providers: [AwardsService, AwardsRepository],
  controllers: [AwardsController, AwardsRepository],
})
export class AwardsModule {}
