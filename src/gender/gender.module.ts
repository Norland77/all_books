import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { GenderRepository } from "./gender.repository";

@Module({
  providers: [GenderService, GenderRepository],
  controllers: [GenderController, GenderRepository]
})
export class GenderModule {}
