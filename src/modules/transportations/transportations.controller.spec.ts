import { Test, TestingModule } from '@nestjs/testing';
import { TransportationsController } from './transportations.controller';
import { TransportationsService } from './transportations.service';

describe('TransportationsController', () => {
  let controller: TransportationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportationsController],
      providers: [TransportationsService],
    }).compile();

    controller = module.get<TransportationsController>(TransportationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
