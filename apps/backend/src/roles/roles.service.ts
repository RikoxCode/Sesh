import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  getRoles(): Promise<RoleEntity[]> {
    return this.prisma.role.findMany();
  }

  getRole(id: string): Promise<RoleEntity | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  createRole(data: CreateRoleDto): Promise<RoleEntity> {
    console.log('Creating role with data:', data);
    return this.prisma.role.create({
      data,
    });
  }

  update(data: UpdateRoleDto): Promise<RoleEntity> {
    return this.prisma.role.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });
  }

  delete(id: string): Promise<boolean> {
    return this.prisma.role
      .delete({
        where: { id },
      })
      .then(() => true)
      .catch(() => false);
  }
}
