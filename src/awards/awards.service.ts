import { Injectable } from '@nestjs/common';
import { AwardsRepository } from './awards.repository';
import { AwardsDto } from "./dto/awards.dto";

@Injectable()
export class AwardsService {
  constructor(private readonly awardsRepository: AwardsRepository) {}

  async findAwardByName(name: string) {
    return this.awardsRepository.findAwardByName(name);
  }

  createAward(dto: AwardsDto) {
    return this.awardsRepository.createAward(dto);
  }

  getAllAwards() {
    return this.awardsRepository.getAllAwards();
  }

  async findAwardById(id: string) {
    return this.awardsRepository.findAwardById(id);
  }

  deleteAwardById(id: string) {
    return this.awardsRepository.deleteAwardById(id);
  }
}
