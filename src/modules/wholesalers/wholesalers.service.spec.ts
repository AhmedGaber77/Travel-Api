import { Test, TestingModule } from '@nestjs/testing';
import { WholesalersService } from './wholesalers.service';

describe('WholesalersService', () => {
  let service: WholesalersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WholesalersService],
    }).compile();

    service = module.get<WholesalersService>(WholesalersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
