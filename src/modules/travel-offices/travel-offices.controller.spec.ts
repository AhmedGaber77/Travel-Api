import { Test, TestingModule } from '@nestjs/testing';
import { TravelOfficesController } from './travel-offices.controller';
import { TravelOfficesService } from './travel-offices.service';

describe('TravelOfficesController', () => {
  let controller: TravelOfficesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelOfficesController],
      providers: [TravelOfficesService],
    }).compile();

    controller = module.get<TravelOfficesController>(TravelOfficesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
