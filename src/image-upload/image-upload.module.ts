import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { GalleryEntity } from './entities/gallery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([GalleryEntity])],
  providers: [ImageUploadService],
  controllers: [ImageUploadController],
})
export class ImageUploadModule {}
