import { Module } from '@nestjs/common';
import { PdfUploadService } from './pdf-upload.service';
import { PdfUploadController } from './pdf-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfEntity } from './entities/pdf.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([PdfEntity]), CloudinaryModule],
  controllers: [PdfUploadController],
  providers: [PdfUploadService],
})
export class PdfUploadModule {}
