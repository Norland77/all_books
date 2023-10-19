import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}

  followById(Id: string, userId: string) {
    return this.followRepository.followById(Id, userId);
  }

  async findAllFollowById(Id: string) {
    return await this.followRepository.findAllFollowById(Id);
  }

  unfollowById(Id: string, userId: any) {
    return this.followRepository.unfollowById(Id, userId);
  }
}
