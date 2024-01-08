import { Test, TestingModule } from '@nestjs/testing';
import { WholesalersController } from './wholesalers.controller';
import { WholesalersService } from './wholesalers.service';

describe('WholesalersController', () => {
  let controller: WholesalersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WholesalersController],
      providers: [WholesalersService],
    }).compile();

    controller = module.get<WholesalersController>(WholesalersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
