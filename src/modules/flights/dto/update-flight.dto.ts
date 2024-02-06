import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFlightDto } from './create-flight.dto';
import { ValidateNested } from 'class-validator';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';
import { Type } from 'class-transformer';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {}

export class UpdateFlightServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'information about the flight',
    type: () => UpdateFlightDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateFlightDto)
  flight: UpdateFlightDto;
}
