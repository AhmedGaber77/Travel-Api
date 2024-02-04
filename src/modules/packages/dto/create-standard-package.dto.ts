import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { Type } from 'class-transformer';
import { CreatePackageDayDto } from './create-package-day.dto';

export class CreateStandardPackageDto {
  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  included: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  excluded: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  tourType: string;

  @ApiProperty({
    type: () => Number,
  })
  serviceId: ServiceEntity['id'];

  @ApiProperty({
    type: () => [CreatePackageDayDto],
  })
  @Type(() => CreatePackageDayDto)
  @ValidateNested({ each: true })
  packageDays: CreatePackageDayDto[];
}
