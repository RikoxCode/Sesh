import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjects(): Promise<ProjectEntity[]> {
    return this.prisma.project.findMany();
  }

  async getProjectsById(projectId: string): Promise<ProjectEntity | null> {
    return this.prisma.project.findUnique({
      where: { id: projectId },
    });
  }

  async createProject(data: CreateProjectDto): Promise<ProjectEntity> {
    return this.prisma.project.create({
      data,
    });
  }

  async updateProject(
    id: string,
    data: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.prisma.project
      .delete({
        where: { id },
      })
      .then(() => true)
      .catch(() => false);
  }
}
