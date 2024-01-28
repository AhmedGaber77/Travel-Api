import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GalleryEntity } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { ImageUploadService } from './image-upload.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageUploadController {
  constructor(
    private readonly imageUploadService: ImageUploadService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.imageUploadService.uploadImages(files);
  }
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FilesInterceptor('file'))
  // async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
  //   return await this.imageUploadService.uploadImages(files);
  // }

  // @Get(':id')
}
