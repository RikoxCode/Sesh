// roles.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';

import { RolesService } from './roles.service';

const prismaMockFactory = () => ({
  role: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('RolesService', () => {
  let service: RolesService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<RolesService>(RolesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getRoles returns list', async () => {
    prisma.role.findMany.mockResolvedValue([{ id: 'r1', name: 'Admin' }]);
    const res = await service.getRoles();
    expect(prisma.role.findMany).toHaveBeenCalledWith();
    expect(res).toEqual([{ id: 'r1', name: 'Admin' }]);
  });

  it('getRole returns single role', async () => {
    prisma.role.findUnique.mockResolvedValue({ id: 'r1', name: 'Admin' });
    const res = await service.getRole('r1');
    expect(prisma.role.findUnique).toHaveBeenCalledWith({
      where: { id: 'r1' },
    });
    expect(res).toEqual({ id: 'r1', name: 'Admin' });
  });

  it('createRole creates role with data and logs once', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    prisma.role.create.mockResolvedValue({ id: 'r1', name: 'Admin' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await service.createRole({ name: 'Admin' } as any);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(prisma.role.create).toHaveBeenCalledWith({
      data: { name: 'Admin' },
    });
    expect(res).toEqual({ id: 'r1', name: 'Admin' });

    spy.mockRestore();
  });

  it('update updates by id and name', async () => {
    prisma.role.update.mockResolvedValue({ id: 'r1', name: 'Editor' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await service.update({ id: 'r1', name: 'Editor' } as any);

    expect(prisma.role.update).toHaveBeenCalledWith({
      where: { id: 'r1' },
      data: { name: 'Editor' },
    });
    expect(res).toEqual({ id: 'r1', name: 'Editor' });
  });

  it('delete returns true on success', async () => {
    prisma.role.delete.mockResolvedValue({ id: 'r1' });
    const ok = await service.delete('r1');
    expect(prisma.role.delete).toHaveBeenCalledWith({ where: { id: 'r1' } });
    expect(ok).toBe(true);
  });

  it('delete returns false on error', async () => {
    prisma.role.delete.mockRejectedValue(new Error('boom'));
    const ok = await service.delete('rX');
    expect(ok).toBe(false);
  });
});
