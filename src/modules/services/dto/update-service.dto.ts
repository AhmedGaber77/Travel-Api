import { PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { Exclude } from 'class-transformer';
import { ServiceType } from '../entities/service.entity';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Exclude()
  WholesalerId?: number | undefined;

  @Exclude()
  type?: ServiceType | undefined;
}

export class PartialCreateServiceDto extends PartialType(CreateServiceDto) {}
