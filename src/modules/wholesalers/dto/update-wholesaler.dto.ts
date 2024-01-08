import { PartialType } from '@nestjs/swagger';
import { CreateWholesalerDto } from './create-wholesaler.dto';

export class UpdateWholesalerDto extends PartialType(CreateWholesalerDto) {}
