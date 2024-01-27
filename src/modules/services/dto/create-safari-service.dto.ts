import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';
import { Type } from 'class-transformer';
import { CreateSafariDto } from 'src/modules/safari/dto/create-safari.dto';

export class CreateSafariServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested()
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the safari',
    type: () => CreateSafariDto,
  })
  @ValidateNested()
  @Type(() => CreateSafariDto)
  safari: CreateSafariDto;
}
