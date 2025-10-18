import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { YearEntity } from './entities/year.entity';
import { CreateYearDto, UpdateYearDto } from './dto';

@Injectable()
export class YearsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<YearEntity[]> {
    return this.prisma.year.findMany();
  }

  findOne(id: string): Promise<YearEntity | null> {
    return this.prisma.year.findUnique({ where: { id } });
  }

  create(data: CreateYearDto): Promise<YearEntity> {
    return this.prisma.year.create({ data });
  }

  update(id: string, data: UpdateYearDto): Promise<YearEntity> {
    return this.prisma.year.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.year.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
