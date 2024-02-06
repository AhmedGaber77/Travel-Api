import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCruiseDto } from './create-cruise.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';

export class UpdateCruiseDto extends PartialType(CreateCruiseDto) {}

export class UpdateCruiseServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'information about the cruise',
    type: () => UpdateCruiseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateCruiseDto)
  cruise: UpdateCruiseDto;
}
