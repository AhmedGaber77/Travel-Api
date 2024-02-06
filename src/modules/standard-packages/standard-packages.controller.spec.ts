import { Test, TestingModule } from '@nestjs/testing';
import { StandardPackagesController } from './standard-packages.controller';
import { StandardPackagesService } from './standard-packages.service';

describe('StandardPackagesController', () => {
  let controller: StandardPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandardPackagesController],
      providers: [StandardPackagesService],
    }).compile();

    controller = module.get<StandardPackagesController>(
      StandardPackagesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
