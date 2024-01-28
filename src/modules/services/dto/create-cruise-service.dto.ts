import { ApiProperty } from '@nestjs/swagger';
import { CreateCruiseDto } from 'src/modules/cruises/dto/create-cruise.dto';
import { CreateServiceDto } from './create-service.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCruiseServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the cruise',
    type: () => CreateCruiseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateCruiseDto)
  cruise: CreateCruiseDto;
}
