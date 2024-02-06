import { Test, TestingModule } from '@nestjs/testing';
import { StandardPackagesService } from './standard-packages.service';

describe('StandardPackagesService', () => {
  let service: StandardPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardPackagesService],
    }).compile();

    service = module.get<StandardPackagesService>(StandardPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
