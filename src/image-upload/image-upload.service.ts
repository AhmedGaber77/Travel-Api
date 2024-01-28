import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GalleryEntity } from './entities/gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImageUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  async uploadImages(files: Express.Multer.File[]) {
    // if (!files || !files.length) {
    //   throw new BadRequestException('No files provided');
    // }

    console.log(files);
    try {
      const uploadedImages = await this.cloudinaryService.uploadImages(files);

      const savedEntities = await this.createAndSaveGalleryEntities(
        uploadedImages.map((image) => image.url),
      );

      return savedEntities;
    } catch (error) {
      throw new InternalServerErrorException('Image upload failed');
    }
  }

  createAndSaveGalleryEntities(imageUrls: string[]) {
    const galleryEntities = imageUrls.map((url) => {
      const entity = new GalleryEntity();
      entity.imageUrl = url;
      return entity;
    });

    return this.galleryRepository.save(galleryEntities);
  }
}
