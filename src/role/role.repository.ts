import { PrismaService } from '@prisma/prisma.service';
import { CreateRoleDto } from './dto/role.dto';
import { Controller } from '@nestjs/common';

@Controller('role')
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(dto: CreateRoleDto) {
    return this.prismaService.role.create({
      data: {
        name: dto.name,
      },
    });
  }
}
