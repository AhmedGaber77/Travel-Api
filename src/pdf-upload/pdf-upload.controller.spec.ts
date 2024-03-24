import { Test, TestingModule } from '@nestjs/testing';
import { PdfUploadController } from './pdf-upload.controller';
import { PdfUploadService } from './pdf-upload.service';

describe('PdfUploadController', () => {
  let controller: PdfUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfUploadController],
      providers: [PdfUploadService],
    }).compile();

    controller = module.get<PdfUploadController>(PdfUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
