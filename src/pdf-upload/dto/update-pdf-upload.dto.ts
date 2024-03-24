import { PartialType } from '@nestjs/swagger';
import { CreatePdfUploadDto } from './create-pdf-upload.dto';

export class UpdatePdfUploadDto extends PartialType(CreatePdfUploadDto) {}
