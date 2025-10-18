import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  async findAll(): Promise<ProjectEntity[]> {
    return this.projects.getProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiParam({ name: 'id', required: true, description: 'Project ID' })
  @ApiOkResponse({ type: ProjectEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async findOne(@Param('id') id: string): Promise<ProjectEntity> {
    const row = await this.projects.getProjectsById(id);
    if (!row) throw new NotFoundException('Project not found');
    return row;
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
   
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ type: ProjectEntity })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() dto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projects.createProject(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', required: true, description: 'Project ID' })
   
  @ApiBody({ type: UpdateProjectDto })
  @ApiOkResponse({ type: ProjectEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    // Prisma throws if not found; if you prefer 404, pre-check:
    const exists = await this.projects.getProjectsById(id);
    if (!exists) throw new NotFoundException('Project not found');
    return this.projects.updateProject(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', required: true, description: 'Project ID' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: { success: { type: 'boolean' } },
    },
  })
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.projects.deleteProject(id);
    if (!success) throw new NotFoundException('Project not found');
    return { success };
  }
}
