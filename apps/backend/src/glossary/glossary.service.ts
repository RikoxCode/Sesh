import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { GlossaryEntity } from './enities/glossary.entity';
import { CreateGlossaryDto, UpdateGlossaryDto } from './dto';

@Injectable()
export class GlossaryService {
  constructor(private readonly prisma: PrismaService) {}

  getGlossary(projectId: string): Promise<GlossaryEntity | null> {
    return this.prisma.glossary.findFirst({ where: { projectId: projectId } });
  }

  createGlossary(data: CreateGlossaryDto): Promise<GlossaryEntity> {
    return this.prisma.glossary.create({ data });
  }

  getAllForProject(projectId: string): Promise<GlossaryEntity[]> {
    return this.prisma.glossary.findMany({ where: { projectId } });
  }

  updateGlossary(id: string, data: UpdateGlossaryDto): Promise<GlossaryEntity> {
    return this.prisma.glossary.update({ where: { id }, data });
  }

  deleteGlossary(id: string): Promise<GlossaryEntity> {
    return this.prisma.glossary.delete({ where: { id } });
  }
}
