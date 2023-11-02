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
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/gender.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public, Roles } from "../../libs/common/src/decorators";
import { $Enums } from '../../prisma/generated/client';
import UserRole = $Enums.UserRole;

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createRole(@Body() dto: CreateGenderDto) {
    return await this.genderService.createGender(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:Id')
  async deleteGender(@Param('Id') id: string) {
    const gender = await this.genderService.findGenderById(id);

    if (!gender) {
      throw new BadRequestException(`No gender with id: ${id}`);
    }

    return this.genderService.deleteGender(id);
  }

  @Public()
  @Get('all')
  getAllGender() {
    return this.genderService.getAllGender();
  }
}
