import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryEntity } from './entities/gallery.entity';
import { ImageUploadService } from './image-upload.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiTags('Images')
@Controller({ path: 'images', version: '1' })
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

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

  @Get(':id')
  async getImage(
    @Param('id') id: string,
  ): Promise<NullableType<GalleryEntity>> {
    return await this.imageUploadService.getImage(+id);
  }
}
