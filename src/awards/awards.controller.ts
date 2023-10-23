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
import { AwardsService } from './awards.service';
import { AwardsDto } from './dto/awards.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../libs/common/src/decorators';
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createAward(@Body() dto: AwardsDto) {
    const award = await this.awardsService.findAwardByName(dto.name);

    if (award) {
      throw new BadRequestException('This name is already in use');
    }

    return this.awardsService.createAward(dto);
  }

  @Get('all')
  getAllAwards() {
    return this.awardsService.getAllAwards();
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deleteAwardById(@Param('Id') id: string) {
    const award = await this.awardsService.findAwardById(id);

    if (!award) {
      throw new BadRequestException(`There is no awards with this id: ${id}`);
    }

    return this.awardsService.deleteAwardById(id);
  }
}
