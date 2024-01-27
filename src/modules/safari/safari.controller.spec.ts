import { Test, TestingModule } from '@nestjs/testing';
import { SafariController } from './safari.controller';
import { SafariService } from './safari.service';

describe('SafariController', () => {
  let controller: SafariController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafariController],
      providers: [SafariService],
    }).compile();

    controller = module.get<SafariController>(SafariController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
