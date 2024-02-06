import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSafariDto } from './create-safari.dto';
import { ValidateNested } from 'class-validator';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';
import { Type } from 'class-transformer';

export class UpdateSafariDto extends PartialType(CreateSafariDto) {}

export class UpdateSafariServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'information about the safari',
    type: () => UpdateSafariDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateSafariDto)
  safari: UpdateSafariDto;
}
