import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransportationDto } from './create-transportation.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';

export class UpdateTransportationDto extends PartialType(
  CreateTransportationDto,
) {}

export class UpdateTransportationServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'information about the transportation',
    type: () => UpdateTransportationDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateTransportationDto)
  transportation: UpdateTransportationDto;
}
