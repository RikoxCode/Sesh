import { Test, TestingModule } from '@nestjs/testing';

import { UsermetasService } from './usermetas.service';

describe('UsermetasService', () => {
  let service: UsermetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsermetasService],
    }).compile();

    service = module.get<UsermetasService>(UsermetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
