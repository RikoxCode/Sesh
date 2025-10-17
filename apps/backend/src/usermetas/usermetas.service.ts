import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UsermetaEntity } from './entities/usermeta.entity';
import { CreateUsermetaDto } from './dto';
import { UpdateUsermetaDto } from './dto';

@Injectable()
export class UsermetasService {
  constructor(private prisma: PrismaService) {}

  async getUsermetas(): Promise<UsermetaEntity[]> {
    const usermetas = await this.prisma.userMeta.findMany();
    return usermetas.map((usermeta) => new UsermetaEntity(usermeta));
  }

  async getUsermetasByUserId(userId: string): Promise<UsermetaEntity[]> {
    const usermetas = await this.prisma.userMeta.findMany({
      where: { userId },
    });

    return usermetas.map((usermeta) => new UsermetaEntity(usermeta));
  }

  async createUsermeta(
    createUsermetaDto: CreateUsermetaDto,
  ): Promise<UsermetaEntity> {
    const usermeta = await this.prisma.userMeta.create({
      data: {
        userId: createUsermetaDto.userId,
        metaKey: createUsermetaDto.metaKey,
        metaValue: createUsermetaDto.metaValue,
      },
    });

    return new UsermetaEntity(usermeta);
  }

  async updateUsermeta(
    updateUsermetaDto: UpdateUsermetaDto,
  ): Promise<UsermetaEntity> {
    const usermeta = await this.prisma.userMeta.update({
      where: { id: updateUsermetaDto.id },
      data: {
        metaKey: updateUsermetaDto.metaKey,
        metaValue: updateUsermetaDto.metaValue,
      },
    });

    return new UsermetaEntity(usermeta);
  }

  async deleteUsermeta(id: string): Promise<void> {
    await this.prisma.userMeta.delete({
      where: { id },
    });
  }
}
