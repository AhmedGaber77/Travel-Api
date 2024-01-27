import { CreateTransportationDto } from 'src/modules/transportations/dto/create-transportation.dto';
import { CreateServiceDto } from './create-service.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportationServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @Type(() => CreateServiceDto)
  @ValidateNested()
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the transportation',
    type: () => CreateTransportationDto,
  })
  @Type(() => CreateTransportationDto)
  @ValidateNested()
  transportation: CreateTransportationDto;
}
