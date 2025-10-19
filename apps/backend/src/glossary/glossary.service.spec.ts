// src/glossary/glossary.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';

import { GlossaryService } from './glossary.service';

const now = new Date('2025-01-01T12:00:00Z');

const prismaMockFactory = () => ({
  glossary: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
});

describe('GlossaryService', () => {
  let service: GlossaryService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlossaryService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<GlossaryService>(GlossaryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getGlossary', () => {
    it('returns the first glossary for a given project', async () => {
      prisma.glossary.findFirst.mockResolvedValue({
        id: 'g1',
        term: 'API',
        definition: 'Application Programming Interface',
        projectId: 'p1',
        createdAt: now,
        updatedAt: now,
      });

      const res = await service.getGlossary('p1');

      expect(prisma.glossary.findFirst).toHaveBeenCalledWith({
        where: { projectId: 'p1' },
      });
      expect(res).toMatchObject({
        id: 'g1',
        term: 'API',
        definition: 'Application Programming Interface',
        projectId: 'p1',
      });
      expect(res?.createdAt).toEqual(now);
      expect(res?.updatedAt).toEqual(now);
    });
  });

  describe('createGlossary', () => {
    it('creates a glossary with merged data', async () => {
      prisma.glossary.create.mockResolvedValue({
        id: 'g2',
        term: 'CI',
        definition: 'Continuous Integration',
        projectId: 'p1',
        createdAt: now,
        updatedAt: now,
      });

      const res = await service.createGlossary('p1', {
        term: 'CI',
        definition: 'Continuous Integration',
      });

      expect(prisma.glossary.create).toHaveBeenCalledWith({
        data: {
          projectId: 'p1',
          term: 'CI',
          definition: 'Continuous Integration',
        } as never,
      });
      expect(res).toMatchObject({
        id: 'g2',
        term: 'CI',
        definition: 'Continuous Integration',
        projectId: 'p1',
      });
    });
  });

  describe('getAllForProject', () => {
    it('returns all glossaries for a project', async () => {
      prisma.glossary.findMany.mockResolvedValue([
        {
          id: 'g1',
          term: 'API',
          definition: 'Application Programming Interface',
          projectId: 'p1',
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 'g2',
          term: 'SDK',
          definition: 'Software Development Kit',
          projectId: 'p1',
          createdAt: now,
          updatedAt: now,
        },
      ]);

      const res = await service.getAllForProject('p1');

      expect(prisma.glossary.findMany).toHaveBeenCalledWith({
        where: { projectId: 'p1' },
      });
      expect(res).toHaveLength(2);
      expect(res[0]).toHaveProperty('term', 'API');
      expect(res[1]).toHaveProperty('term', 'SDK');
    });
  });

  describe('updateGlossary', () => {
    it('updates a glossary and returns the updated entity', async () => {
      prisma.glossary.update.mockResolvedValue({
        id: 'g1',
        term: 'API',
        definition: 'Updated',
        projectId: 'p1',
        createdAt: now,
        updatedAt: now,
      });

      const res = await service.updateGlossary('g1', { definition: 'Updated' });

      expect(prisma.glossary.update).toHaveBeenCalledWith({
        where: { id: 'g1' },
         
        data: { definition: 'Updated' } as never,
      });
      expect(res).toMatchObject({
        id: 'g1',
        definition: 'Updated',
      });
    });

    it('bubbles up errors from Prisma', async () => {
      prisma.glossary.update.mockRejectedValue(new Error('boom'));
      await expect(
        service.updateGlossary('bad', { term: 'X' }),
      ).rejects.toThrow('boom');
    });
  });

  describe('deleteGlossary', () => {
    it('deletes a glossary and returns the deleted entity', async () => {
      prisma.glossary.delete.mockResolvedValue({
        id: 'g1',
        term: 'API',
        definition: 'Application Programming Interface',
        projectId: 'p1',
        createdAt: now,
        updatedAt: now,
      });

      const res = await service.deleteGlossary('g1');

      expect(prisma.glossary.delete).toHaveBeenCalledWith({
        where: { id: 'g1' },
      });
      expect(res).toMatchObject({ id: 'g1', term: 'API' });
    });

    it('bubbles up errors from Prisma on delete', async () => {
      prisma.glossary.delete.mockRejectedValue(new Error('nope'));
      await expect(service.deleteGlossary('x')).rejects.toThrow('nope');
    });
  });
});
