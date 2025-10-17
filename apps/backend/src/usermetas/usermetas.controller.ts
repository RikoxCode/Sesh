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

import { UsermetasService } from './usermetas.service';
import { CreateUsermetaDto, UpdateUsermetaDto } from './dto';
import { UsermetaEntity } from './entities/usermeta.entity';

@ApiTags('Usermetas')
@Controller('api/usermetas')
export class UsermetasController {
  constructor(private readonly usermetasService: UsermetasService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all usermetas' })
  @ApiResponse({
    status: 200,
    description: 'List of usermetas',
    type: [UsermetaEntity],
  })
  async getUsermetas() {
    return this.usermetasService.getUsermetas();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get all usermetas for a user' })
  @ApiParam({ name: 'userId', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of usermetas for given user',
    type: [UsermetaEntity],
  })
  async getUsermetasByUserId(@Param('userId') userId: string) {
    return this.usermetasService.getUsermetasByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new usermeta entry' })
  @ApiResponse({
    status: 201,
    description: 'Usermeta successfully created',
    type: UsermetaEntity,
  })
  async createUsermeta(@Body() dto: CreateUsermetaDto) {
    return this.usermetasService.createUsermeta(dto);
  }

  @Put()
  @ApiOperation({ summary: 'Update an existing usermeta entry' })
  @ApiResponse({
    status: 200,
    description: 'Usermeta successfully updated',
    type: UsermetaEntity,
  })
  async updateUsermeta(@Body() dto: UpdateUsermetaDto) {
    return this.usermetasService.updateUsermeta(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a usermeta entry by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 204,
    description: 'Usermeta successfully deleted',
  })
  async deleteUsermeta(@Param('id') id: string): Promise<void> {
    await this.usermetasService.deleteUsermeta(id);
  }
}
