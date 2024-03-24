import {
  Controller,
  Get,
  Post,
  Param,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PdfUploadService } from './pdf-upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { NullableType } from 'src/utils/types/nullable.type';
import { PdfEntity } from './entities/pdf.entity';

@ApiTags('Pdf Upload')
@Controller('pdfs')
export class PdfUploadController {
  constructor(private readonly pdfUploadService: PdfUploadService) {}

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
  async uploadPdfs(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 }),
          // new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return await this.pdfUploadService.uploadPdfs(files);
  }

  @Get(':id')
  async getImage(@Param('id') id: string): Promise<NullableType<PdfEntity>> {
    return await this.pdfUploadService.getPdf(+id);
  }
}
