import { Test, TestingModule } from '@nestjs/testing';
import { CruisesController } from './cruises.controller';
import { CruisesService } from './cruises.service';

describe('CruisesController', () => {
  let controller: CruisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CruisesController],
      providers: [CruisesService],
    }).compile();

    controller = module.get<CruisesController>(CruisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
