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
import { PublisherService } from './publisher.service';
import { PublisherDto } from './dto/publisher.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../libs/common/src/decorators';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createPublisher(@Body() dto: PublisherDto) {
    const publisher = await this.publisherService.findPublisherByName(dto.name);

    if (publisher) {
      throw new BadRequestException('This name is already in use');
    }

    return this.publisherService.createPublisher(dto);
  }

  @Get('all')
  async getAllPublisher() {
    return this.publisherService.getAllPublisher();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deletePublisherById(@Param('Id') Id: string) {
    const publisher = await this.publisherService.findPublisherById(Id);

    if (!publisher) {
      throw new BadRequestException(
        `There is no publisher with this ID: ${Id}`,
      );
    }

    return this.publisherService.deletePublisherById(Id);
  }
}
