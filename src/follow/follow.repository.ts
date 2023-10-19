import { Controller } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Controller('user')
export class FollowRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
