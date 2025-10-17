import {
  //BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('search')
  async searchUser(@Query('q') query: string) {
    return this.usersService.searchUser(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Get('role/:roleId')
  async getUsersByRole(@Param('roleId') roleId: string) {
    return this.usersService.getUsersByRole(roleId);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
