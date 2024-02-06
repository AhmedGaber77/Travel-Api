import { CreateStandardPackageDto } from 'src/modules/standard-packages/dto/create-standard-package.dto';
import { CreateServiceDto } from './create-service.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStandardPackageServiceDto {
  @ApiProperty({
    type: () => CreateStandardPackageDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateStandardPackageDto)
  standardPackage: CreateStandardPackageDto;

  @ApiProperty({
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;
}
