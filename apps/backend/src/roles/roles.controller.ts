import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleEntity } from './entities/role.entity';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: 200,
    description: 'List of all roles',
    type: [RoleEntity],
  })
  getAll() {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Role found',
    type: RoleEntity,
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  getOne(@Param('id') id: string) {
    return this.rolesService.getRole(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role successfully created',
    type: RoleEntity,
  })
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Update an existing role' })
  @ApiResponse({
    status: 200,
    description: 'Role successfully updated',
    type: RoleEntity,
  })
  update(@Body() dto: UpdateRoleDto) {
    return this.rolesService.update(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Role successfully deleted' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  async delete(@Param('id') id: string): Promise<void> {
    const success = await this.rolesService.delete(id);
    if (!success) {
      throw new Error('Role not found or could not be deleted');
    }
  }
}
