// usermetas.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';

import { UsermetasService } from './usermetas.service';

// ---- Mocks ----
jest.mock('./entities/usermeta.entity', () => {
  class UsermetaEntity {
    id?: string;
    userId?: string;
    metaKey?: string;
    metaValue?: string;
    constructor(data: Partial<UsermetaEntity>) {
      Object.assign(this, data);
    }
  }
  return { UsermetaEntity };
});

const prismaMockFactory = () => ({
  userMeta: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

// ---- Tests ----
describe('UsermetasService', () => {
  let service: UsermetasService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsermetasService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsermetasService>(UsermetasService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getUsermetas
  it('getUsermetas returns mapped entities', async () => {
    prisma.userMeta.findMany.mockResolvedValue([
      { id: '1', userId: 'u1', metaKey: 'theme', metaValue: 'dark' },
      { id: '2', userId: 'u2', metaKey: 'lang', metaValue: 'de' },
    ]);

    const res = await service.getUsermetas();
    expect(prisma.userMeta.findMany).toHaveBeenCalledWith();
    expect(res).toHaveLength(2);
    expect(res[0]).toHaveProperty('metaKey', 'theme');
  });

  // getUsermetasByUserId
  it('getUsermetasByUserId filters by userId', async () => {
    prisma.userMeta.findMany.mockResolvedValue([
      { id: '1', userId: 'u1', metaKey: 'theme', metaValue: 'dark' },
    ]);

    const res = await service.getUsermetasByUserId('u1');
    expect(prisma.userMeta.findMany).toHaveBeenCalledWith({
      where: { userId: 'u1' },
    });
    expect(res).toHaveLength(1);
    expect(res[0]).toHaveProperty('userId', 'u1');
  });

  // createUsermeta
  it('createUsermeta creates and wraps entity', async () => {
    prisma.userMeta.create.mockResolvedValue({
      id: 'm1',
      userId: 'u1',
      metaKey: 'theme',
      metaValue: 'dark',
    });

    const res = await service.createUsermeta({
      userId: 'u1',
      metaKey: 'theme',
      metaValue: 'dark',
    });

    expect(prisma.userMeta.create).toHaveBeenCalledWith({
      data: { userId: 'u1', metaKey: 'theme', metaValue: 'dark' },
    });
    expect(res).toHaveProperty('id', 'm1');
  });

  // updateUsermeta
  it('updateUsermeta updates and wraps entity', async () => {
    prisma.userMeta.update.mockResolvedValue({
      id: 'm1',
      userId: 'u1',
      metaKey: 'theme',
      metaValue: 'light',
    });

    const res = await service.updateUsermeta({
      id: 'm1',
      metaKey: 'theme',
      metaValue: 'light',
    });

    expect(prisma.userMeta.update).toHaveBeenCalledWith({
      where: { id: 'm1' },
      data: { metaKey: 'theme', metaValue: 'light' },
    });
    expect(res).toHaveProperty('metaValue', 'light');
  });

  // deleteUsermeta
  it('deleteUsermeta deletes without error', async () => {
    prisma.userMeta.delete.mockResolvedValue({ id: 'm1' });

    await expect(service.deleteUsermeta('m1')).resolves.toBeUndefined();
    expect(prisma.userMeta.delete).toHaveBeenCalledWith({
      where: { id: 'm1' },
    });
  });

  // error propagation
  it('createUsermeta propagates errors', async () => {
    const err = new Error('boom');
    prisma.userMeta.create.mockRejectedValue(err);
    await expect(
      service.createUsermeta({ userId: 'u1', metaKey: 'x', metaValue: 'y' }),
    ).rejects.toBe(err);
  });

  it('updateUsermeta propagates errors', async () => {
    const err = new Error('nope');
    prisma.userMeta.update.mockRejectedValue(err);
    await expect(
      service.updateUsermeta({ id: 'm1', metaKey: 'k', metaValue: 'v' }),
    ).rejects.toBe(err);
  });

  it('deleteUsermeta propagates errors', async () => {
    const err = new Error('gone');
    prisma.userMeta.delete.mockRejectedValue(err);
    await expect(service.deleteUsermeta('m1')).rejects.toBe(err);
  });
});
