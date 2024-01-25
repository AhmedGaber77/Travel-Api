import { CreateFlightDto } from 'src/modules/flights/dto/create-flight.dto';
import { CreateServiceDto } from './create-service.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlightServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested()
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the flight',
    type: () => CreateFlightDto,
  })
  @ValidateNested()
  @Type(() => CreateFlightDto)
  flight: CreateFlightDto;
}
