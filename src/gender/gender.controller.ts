import { Body, Controller, Post } from "@nestjs/common";
import { GenderService } from "./gender.service";
import { CreateGenderDto } from "./dto/gender.dto";

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post('create')
  async createRole(@Body() dto: CreateGenderDto) {
    return await this.genderService.createGender(dto);
  }
}
