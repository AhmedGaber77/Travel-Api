import { Test, TestingModule } from '@nestjs/testing';
import { CruisesService } from './cruises.service';

describe('CruisesService', () => {
  let service: CruisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CruisesService],
    }).compile();

    service = module.get<CruisesService>(CruisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
