import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from "./dto/role.dto";

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.createRole(dto);
  }
}
