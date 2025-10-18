import { Test, TestingModule } from '@nestjs/testing';

import { ProjectsService } from './projects.service';

const prismaMockFactory = () => ({
  project: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $transaction: jest.fn(),
});

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: ReturnType<typeof prismaMockFactory>;

  beforeEach(async () => {
    prisma = prismaMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getProjects returns list', async () => {
    prisma.project.findMany.mockResolvedValue([{ id: 'r1', name: 'Admin' }]);
    const res = await service.getProjects();
    expect(prisma.project.findMany).toHaveBeenCalledWith();
    expect(res).toEqual([{ id: 'r1', name: 'Admin' }]);
  });

  it('getProjectsById returns matching project', async () => {
    prisma.project.findMany.mockResolvedValue([
      { id: 'p1', name: 'Project 1' },
    ]);
    const res = await service.getProjectsById('p1');
    expect(prisma.project.findMany).toHaveBeenCalledWith({
      where: { id: 'p1' },
    });
    expect(res).toEqual([{ id: 'p1', name: 'Project 1' }]);
  });

  it('createProject creates project with data', async () => {
    prisma.project.create.mockResolvedValue({ id: 'p1', name: 'Project 1' });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await service.createProject({ name: 'Project 1' } as any);

    expect(prisma.project.create).toHaveBeenCalledWith({
      data: { name: 'Project 1' },
    });
    expect(res).toEqual({ id: 'p1', name: 'Project 1' });
  });

  it('updateProject updates project with id and data', async () => {
    prisma.project.update.mockResolvedValue({
      id: 'p1',
      name: 'Updated Project',
    });

    const res = await service.updateProject('p1', {
      name: 'Updated Project',
    } as never);

    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: 'p1' },
      data: { name: 'Updated Project' },
    });
    expect(res).toEqual({ id: 'p1', name: 'Updated Project' });
  });

  it('deleteProject deletes project by id and returns true', async () => {
    prisma.project.delete.mockResolvedValue({ id: 'p1' });

    const res = await service.deleteProject('p1');
    expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id: 'p1' } });
    expect(res).toBe(true);
  });
});
