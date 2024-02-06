import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStandardPackageDto } from './create-standard-package.dto';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UpdateStandardPackageDto extends PartialType(
  CreateStandardPackageDto,
) {}

export class UpdateStandardPackageServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'information about the standard Package',
    type: () => UpdateStandardPackageDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateStandardPackageDto)
  standardPackage: UpdateStandardPackageDto;
}
