import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { GlossaryService } from './glossary.service';
import { GlossaryEntity } from './enities/glossary.entity';
import { CreateGlossaryDto, UpdateGlossaryDto } from './dto';

@ApiTags('glossary')
@Controller()
export class GlossaryController {
  constructor(private readonly service: GlossaryService) {}

  @Get('projects/:projectId/glossary')
  @ApiOperation({ summary: 'Get single glossary for a project' })
  @ApiParam({
    name: 'projectId',
    description: 'Project ID',
    example: 'prj_123',
  })
  @ApiResponse({
    status: 200,
    description: 'Glossary or null',
    type: GlossaryEntity,
  })
  async getGlossary(
    @Param('projectId') projectId: string,
  ): Promise<GlossaryEntity | null> {
    return this.service.getGlossary(projectId);
  }

  @Get('projects/:projectId/glossaries')
  @ApiOperation({ summary: 'List all glossaries for a project' })
  @ApiParam({
    name: 'projectId',
    description: 'Project ID',
    example: 'prj_123',
  })
  @ApiResponse({
    status: 200,
    description: 'Glossary list',
    type: [GlossaryEntity],
  })
  async getAllForProject(
    @Param('projectId') projectId: string,
  ): Promise<GlossaryEntity[]> {
    return this.service.getAllForProject(projectId);
  }

  @Post('glossaries')
  @ApiOperation({ summary: 'Create glossary' })
  @ApiBody({ type: CreateGlossaryDto })
  @ApiResponse({
    status: 201,
    description: 'Created glossary',
    type: GlossaryEntity,
  })
  async create(@Body() dto: CreateGlossaryDto): Promise<GlossaryEntity> {
    return this.service.createGlossary(dto);
  }

  @Patch('glossaries/:id')
  @ApiOperation({ summary: 'Update glossary' })
  @ApiParam({ name: 'id', description: 'Glossary ID', example: 'glo_456' })
  @ApiBody({ type: UpdateGlossaryDto })
  @ApiResponse({
    status: 200,
    description: 'Updated glossary',
    type: GlossaryEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGlossaryDto,
  ): Promise<GlossaryEntity> {
    return this.service.updateGlossary(id, dto);
  }

  @Delete('glossaries/:id')
  @ApiOperation({ summary: 'Delete glossary' })
  @ApiParam({ name: 'id', description: 'Glossary ID', example: 'glo_456' })
  @ApiResponse({
    status: 200,
    description: 'Deleted glossary',
    type: GlossaryEntity,
  })
  async delete(@Param('id') id: string): Promise<GlossaryEntity> {
    return this.service.deleteGlossary(id);
  }
}
