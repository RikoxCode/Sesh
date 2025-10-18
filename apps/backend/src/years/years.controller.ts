// src/years/years.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { YearsService } from './years.service';
import { CreateYearDto, UpdateYearDto } from './dto';
import { YearEntity } from './entities/year.entity';

@ApiTags('years')
@Controller('years')
export class YearsController {
  constructor(private readonly years: YearsService) {}

  @Get()
  @ApiOperation({ summary: 'List all years' })
  @ApiOkResponse({ type: [YearEntity] })
  findAll(): Promise<YearEntity[]> {
    return this.years.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one year' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: YearEntity })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string): Promise<YearEntity | null> {
    return this.years.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create year' })
  @ApiBody({ type: CreateYearDto })
  @ApiCreatedResponse({ type: YearEntity })
  create(@Body() dto: CreateYearDto): Promise<YearEntity> {
    return this.years.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update year' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateYearDto })
  @ApiOkResponse({ type: YearEntity })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateYearDto,
  ): Promise<YearEntity> {
    return this.years.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete year' })
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.years.remove(id);
  }
}
