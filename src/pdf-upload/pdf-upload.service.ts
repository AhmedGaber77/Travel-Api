import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfEntity } from './entities/pdf.entity';

@Injectable()
export class PdfUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(PdfEntity)
    private readonly pdfRepository: Repository<PdfEntity>,
  ) {}
  async uploadPdfs(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    try {
      const uploadedPdfs = await this.cloudinaryService.uploadPdfs(files);
      const savedEntities = await this.createAndSavePdfEntities(
        uploadedPdfs.map((pdf) => pdf.url),
      );
      return savedEntities;
    } catch (error) {
      throw new BadRequestException('Pdf upload failed');
    }
  }

  async createAndSavePdfEntities(pdfUrls: string[]) {
    const pdfEntities = pdfUrls.map((url) => {
      const pdfEntity = this.pdfRepository.create({ url: url });
      return pdfEntity;
    });

    return this.pdfRepository.save(pdfEntities);
  }

  async getPdf(id: number) {
    const pdf = await this.pdfRepository.findOne({ where: { id } });
    if (!pdf) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }
    return pdf;
  }
}
