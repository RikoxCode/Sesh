// src/years/years.service.spec.ts
import { Test } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';

import { YearsService } from './years.service';
import { YearEntity } from './entities/year.entity';
import { CreateYearDto, UpdateYearDto } from './dto';

const prismaMockFactory = () => ({
  year: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('YearsService', () => {
  let service: YearsService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  const now = new Date('2025-10-19T12:00:00.000Z');

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module = await Test.createTestingModule({
      providers: [YearsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get(YearsService);
  });

  it('findAll() returns a list of years', async () => {
    const data: YearEntity[] = [
      new YearEntity({
        id: 'y1',
        year: 2024,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      }),
      new YearEntity({
        id: 'y2',
        year: 2025,
        isActive: false,
        createdAt: now,
        updatedAt: now,
      }),
    ];
    prisma.year.findMany.mockResolvedValue(data);

    await expect(service.findAll()).resolves.toEqual(data);
    expect(prisma.year.findMany).toHaveBeenCalledWith();
  });

  it('findOne() returns a single year', async () => {
    const item = new YearEntity({
      id: 'y1',
      year: 2024,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    prisma.year.findUnique.mockResolvedValue(item);

    await expect(service.findOne('y1')).resolves.toEqual(item);
    expect(prisma.year.findUnique).toHaveBeenCalledWith({
      where: { id: 'y1' },
    });
  });

  it('findOne() returns null if not found', async () => {
    prisma.year.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).resolves.toBeNull();
    expect(prisma.year.findUnique).toHaveBeenCalledWith({
      where: { id: 'missing' },
    });
  });

  it('create() creates a new year', async () => {
    const dto: CreateYearDto = { year: 2026, isActive: true };
    const created = new YearEntity({
      id: 'y3',
      year: 2026,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    prisma.year.create.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(prisma.year.create).toHaveBeenCalledWith({ data: dto });
  });

  it('update() updates existing year fields', async () => {
    const id = 'y3';
    const dto: UpdateYearDto = { year: 2026, isActive: false };
    const updated = new YearEntity({
      id,
      year: 2026,
      isActive: false,
      createdAt: now,
      updatedAt: now,
    });
    prisma.year.update.mockResolvedValue(updated);

    await expect(service.update(id, dto)).resolves.toEqual(updated);
    expect(prisma.year.update).toHaveBeenCalledWith({
      where: { id },
      data: dto,
    });
  });

  it('remove() returns true on success', async () => {
    prisma.year.delete.mockResolvedValue({ id: 'y4' });

    await expect(service.remove('y4')).resolves.toBe(true);
    expect(prisma.year.delete).toHaveBeenCalledWith({ where: { id: 'y4' } });
  });

  it('remove() returns false on failure', async () => {
    prisma.year.delete.mockRejectedValue(new Error('not found'));

    await expect(service.remove('missing')).resolves.toBe(false);
    expect(prisma.year.delete).toHaveBeenCalledWith({
      where: { id: 'missing' },
    });
  });
});
