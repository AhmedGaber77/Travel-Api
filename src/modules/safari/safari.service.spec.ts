import { Test, TestingModule } from '@nestjs/testing';
import { SafariService } from './safari.service';

describe('SafariService', () => {
  let service: SafariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SafariService],
    }).compile();

    service = module.get<SafariService>(SafariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
