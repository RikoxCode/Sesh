// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UsermetaEntity } from 'src/usermetas/entities/usermeta.entity';

import { PrismaService } from '../prisma/prisma.service';

import { UsersService } from './users.service';

// ---- Mocks ----
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPw'),
}));

// Mock UserEntity + static withMetas used in getUsers()
jest.mock('./entities/user.entity', () => {
  class UserEntity {
    id: string;
    email: string;
    metas: UsermetaEntity[];
    constructor(user: Partial<UserEntity>) {
      Object.assign(this, user);
    }
    static withMetas = jest.fn(
      (u: Partial<UserEntity>) => new UserEntity({ ...u, metas: [] }),
    );
  }
  return { UserEntity };
});

const prismaMockFactory = () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

// helper: craft a Prisma error that passes instanceof check
function prismaError(code: string) {
  const err = new Error(code);
  Object.defineProperty(err, 'code', { value: code });
  Object.setPrototypeOf(err, PrismaClientKnownRequestError.prototype);
  return err as unknown as PrismaClientKnownRequestError & { code: string };
}

// ---- Tests ----
describe('UsersService', () => {
  let service: UsersService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  // basic
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getUsers
  it('getUsers returns mapped entities', async () => {
    prisma.user.findMany.mockResolvedValue([
      { id: '1', email: 'a@a', password: 'x' },
      { id: '2', email: 'b@b', password: 'y' },
    ]);

    const res = await service.getUsers();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res).toHaveLength(2);
    expect(res[0]).toHaveProperty('email', 'a@a');
  });

  // getUserById
  it('getUserById returns UserEntity', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'a@a' });
    const res = await service.getUserById('1');
    expect(res).toHaveProperty('email', 'a@a');
  });

  it('getUserById throws NotFound when null', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.getUserById('x')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // getUserByEmail
  it('getUserByEmail returns UserEntity', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'a@a' });
    const res = await service.getUserByEmail('a@a');
    expect(res).toHaveProperty('id', '1');
  });

  it('getUserByEmail throws NotFound when null', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(service.getUserByEmail('none@x')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // getUsersByRole
  it('getUsersByRole returns list', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: '1' }, { id: '2' }]);
    const res = await service.getUsersByRole('role-1');
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      where: { roleId: 'role-1' },
    });
    expect(res).toHaveLength(2);
  });

  // searchUser
  it('searchUser builds OR query and returns list', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: '1', email: 'x@x' }]);
    const res = await service.searchUser('rik');
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res[0]).toHaveProperty('email', 'x@x');
  });

  // createUser happy path
  it('createUser hashes password and creates user', async () => {
    prisma.user.create.mockResolvedValue({ id: '1', email: 'a@a' });
    const res = await service.createUser({
      email: 'a@a',
      firstName: 'A',
      lastName: 'B',
      password: 'pw',
      abbreviation: 'AB',
      roleId: 'r1',
    });

    expect(bcrypt.hash).toHaveBeenCalledWith('pw', 10);
    expect(prisma.user.create).toHaveBeenCalled();
    expect(res).toHaveProperty('email', 'a@a');
  });

  // createUser unique conflict P2002
  it('createUser throws Conflict on P2002', async () => {
    prisma.user.create.mockRejectedValue(prismaError('P2002'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(service.createUser({} as any)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  // createUser FK conflict P2003
  it('createUser throws Conflict on P2003', async () => {
    prisma.user.create.mockRejectedValue(prismaError('P2003'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(service.createUser({} as any)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  // createUser unknown error -> 500
  it('createUser throws 500 on unknown error', async () => {
    prisma.user.create.mockRejectedValue(new Error('boom'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(service.createUser({} as any)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  // updateUser happy
  it('updateUser updates and returns entity', async () => {
    prisma.user.update.mockResolvedValue({ id: '1', email: 'upd@x' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await service.updateUser('1', { firstName: 'New' } as any);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { firstName: 'New' },
    });
    expect(res).toHaveProperty('email', 'upd@x');
  });

  // updateUser not found P2025
  it('updateUser throws NotFound on P2025', async () => {
    prisma.user.update.mockRejectedValue(prismaError('P2025'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(service.updateUser('bad', {} as any)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // updateUser unknown -> 500
  it('updateUser throws 500 on unknown error', async () => {
    prisma.user.update.mockRejectedValue(new Error('x'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(service.updateUser('1', {} as any)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  // deleteUser ok
  it('deleteUser deletes without error', async () => {
    prisma.user.delete.mockResolvedValue({ id: '1' });
    await expect(service.deleteUser('1')).resolves.toBeUndefined();
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  // deleteUser not found P2025
  it('deleteUser throws NotFound on P2025', async () => {
    prisma.user.delete.mockRejectedValue(prismaError('P2025'));
    await expect(service.deleteUser('bad')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  // deleteUser unknown -> 500
  it('deleteUser throws 500 on unknown error', async () => {
    prisma.user.delete.mockRejectedValue(new Error('nope'));
    await expect(service.deleteUser('1')).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
