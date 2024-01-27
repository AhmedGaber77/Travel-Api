import { PartialType } from '@nestjs/swagger';
import { CreateSafariDto } from './create-safari.dto';

export class UpdateSafariDto extends PartialType(CreateSafariDto) {}
