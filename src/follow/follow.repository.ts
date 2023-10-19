import { BadRequestException, Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Controller('user')
export class FollowRepository {
  constructor(private readonly prismaService: PrismaService) {}

  followById(Id: string, userId: string) {
    return this.prismaService.following.create({
      data: {
        userId: userId,
        followingId: Id,
      },
    });
  }

  async findAllFollowById(Id: string) {
    const user = await this.prismaService.following.findMany({
      where: {
        userId: Id,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }
    const allUsers: any[] = [];

    for (let i = 0; i < user.length; i++) {
      const followUser = await this.prismaService.user.findFirst({
        where: {
          id: user[i].followingId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          first_name: true,
          last_name: true,
          gender: true,
          country: true,
          avatar: true,
          role: true,
          following: true,
          shelfs: true,
          books: true,
          reviews: true,
        },
      });
      allUsers.push(followUser);
    }
    return allUsers;
  }

  async unfollowById(Id: string, userId: any) {
    const follow = await this.prismaService.following.findFirst({
      where: {
        AND: [{ userId: userId }, { followingId: Id }],
      },
    });

    if (!follow) {
      throw new BadRequestException();
    }

    return this.prismaService.following.delete({
      where: {
        id: follow.id,
      },
    });
  }
}
