import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new NotFoundException('No users found');
    }

    return Promise.all(users.map((user) => UserEntity.withMetas(user)));
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('No user found with this email');
    }

    return user ? new UserEntity(user) : null;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('No user found with this email');
    }

    return user ? new UserEntity(user) : null;
  }

  async getUsersByRole(roleId: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: { roleId },
    });

    if (!users) {
      throw new NotFoundException('No users found with this role');
    }

    return users.map((user) => new UserEntity(user));
  }

  async searchUser(query: string): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { abbreviation: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    if (!users) {
      throw new NotFoundException('No users found matching the query');
    }

    return users.map((user) => new UserEntity(user));
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return new UserEntity(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email or Abbreviation already exists');
        }
        if (error.code === 'P2003') {
          throw new ConflictException('Role does not exist');
        }
      }

      console.log(error);
      throw new InternalServerErrorException('Could not create user');
    }
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      return new UserEntity(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      throw new InternalServerErrorException('Could not update user');
    }
  }

  //   async updatePassword(
  //     id: string,
  //     oldPassword: string,
  //     password: string,
  //   ): Promise<UserEntity> {
  //     const oldUser = await this.prisma.user.findUnique({
  //       where: { id },
  //     });

  //     if (!oldUser) {
  //       throw new NotFoundException('User not found');
  //     }

  //     const isOldPasswordValid = await bcrypt.compare(
  //       oldPassword,
  //       oldUser.password,
  //     );
  //     if (!isOldPasswordValid) {
  //       throw new ConflictException('Old password is incorrect');
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     if (oldUser?.password === hashedPassword) {
  //       throw new ConflictException(
  //         'New password must be different from old password',
  //       );
  //     }

  //     const user = await this.prisma.user.update({
  //       where: { id },
  //       data: { password: hashedPassword },
  //     });

  //     return new UserEntity(user);
  //   }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }

      throw new InternalServerErrorException(`Could not delete user`);
    }
  }
}
