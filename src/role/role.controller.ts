import { Body, Controller, Post } from "@nestjs/common";
import { RoleService } from './role.service';
import { CreateRoleDto } from "./dto/role.dto";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }
}
