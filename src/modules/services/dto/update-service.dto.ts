import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateStandardPackageDto } from 'src/modules/packages/dto/create-standard-package.dto';
import { CreatePackageDayDto } from 'src/modules/packages/dto/create-package-day.dto';
import { ServiceType } from '../entities/service.entity';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Exclude()
  WholesalerId?: number | undefined;

  @Exclude()
  type?: ServiceType | undefined;
}

export class PartialCreateServiceDto extends PartialType(CreateServiceDto) {}

export class PartioalCreateStandardPackageServiceDto extends PartialType(
  CreateStandardPackageDto,
) {
  @ApiHideProperty()
  packageDays?: CreatePackageDayDto[] | undefined;
}

export class UpdateStandardPackageServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'inormation about the standard package',
    type: () => PartioalCreateStandardPackageServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PartioalCreateStandardPackageServiceDto)
  standardPackage: PartioalCreateStandardPackageServiceDto;
}
