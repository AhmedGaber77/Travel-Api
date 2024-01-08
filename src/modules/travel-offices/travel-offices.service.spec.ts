import { Test, TestingModule } from '@nestjs/testing';
import { TravelOfficesService } from './travel-offices.service';

describe('TravelOfficesService', () => {
  let service: TravelOfficesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelOfficesService],
    }).compile();

    service = module.get<TravelOfficesService>(TravelOfficesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
