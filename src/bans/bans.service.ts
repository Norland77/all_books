import { Injectable } from '@nestjs/common';
import { BansRepository } from './bans.repository';
import { CreateBansDto } from './dto/bans.dto';
import { Bans } from "../../prisma/generated/client";

@Injectable()
export class BansService {
  constructor(private readonly bansRepository: BansRepository) {}

  banUserById(Id: string, dto: CreateBansDto) {
    return this.bansRepository.banUserById(Id, dto);
  }

  unbannedUserById(Id: string, lastBan: Bans) {
    return this.bansRepository.unbannedUserById(Id, lastBan);
  }

  findLastBan(Id: string) {
    return this.bansRepository.findLastBan(Id);
  }
}
