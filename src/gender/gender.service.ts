import { Injectable } from '@nestjs/common';
import { GenderRepository } from "./gender.repository";
import { CreateGenderDto } from "./dto/gender.dto";

@Injectable()
export class GenderService {
  constructor(private readonly genderRepository: GenderRepository) {}

  async createGender(dto: CreateGenderDto) {
    return await this.genderRepository.createGender(dto);
  }
}
