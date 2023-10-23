import { Injectable } from '@nestjs/common';
import { GenderRepository } from './gender.repository';
import { CreateGenderDto } from './dto/gender.dto';

@Injectable()
export class GenderService {
  constructor(private readonly genderRepository: GenderRepository) {}

  async createGender(dto: CreateGenderDto) {
    return await this.genderRepository.createGender(dto);
  }

  async findGenderById(id: string) {
    return await this.genderRepository.findGenderById(id);
  }

  deleteGender(id: string) {
    return this.genderRepository.deleteGender(id);
  }

  getAllGender() {
    return this.genderRepository.getAllGender();
  }

  findGenderByName(name: string) {
    return this.genderRepository.findGenderByName(name);
  }
}
