import { PartialType } from '@nestjs/swagger';
import { CreateTravelOfficeDto } from './create-travel-office.dto';

export class UpdateTravelOfficeDto extends PartialType(CreateTravelOfficeDto) {}
