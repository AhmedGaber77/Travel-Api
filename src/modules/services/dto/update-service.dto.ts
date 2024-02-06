import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { Exclude, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateFlightDto } from 'src/modules/flights/dto/create-flight.dto';
import { CreateCruiseDto } from 'src/modules/cruises/dto/create-cruise.dto';
import { CreateSafariDto } from 'src/modules/safari/dto/create-safari.dto';
import { CreateTransportationDto } from 'src/modules/transportations/dto/create-transportation.dto';
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

export class PartialCreateFlightServiceDto extends PartialType(
  CreateFlightDto,
) {}
export class PartialCreateCruiseServiceDto extends PartialType(
  CreateCruiseDto,
) {}
export class PartialCreateSafariServiceDto extends PartialType(
  CreateSafariDto,
) {}
export class PartialCreateTransportationServiceDto extends PartialType(
  CreateTransportationDto,
) {}

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

export class UpdateFlightServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'The id of the flight',
    example: 1,
    required: true,
  })
  FlightId: number;

  @ApiProperty({
    description: 'information about the flight',
    type: () => PartialCreateFlightServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PartialCreateFlightServiceDto)
  flight: PartialCreateFlightServiceDto;
}

export class UpdateCruiseServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'The id of the cruise',
    example: 1,
    required: true,
  })
  CruiseId: number;

  @ApiProperty({
    description: 'information about the cruise',
    type: () => PartialCreateCruiseServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PartialCreateCruiseServiceDto)
  cruise: PartialCreateCruiseServiceDto;
}

export class UpdateSafariServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'The id of the safari',
    example: 1,
    required: true,
  })
  SafariId: number;

  @ApiProperty({
    description: 'information about the safari',
    type: () => PartialCreateSafariServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PartialCreateSafariServiceDto)
  safari: PartialCreateSafariServiceDto;
}

export class UpdateTransportationServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateServiceDto)
  service: UpdateServiceDto;

  @ApiProperty({
    description: 'The id of the transportation',
    example: 1,
    required: true,
  })
  TransportationId: number;

  @ApiProperty({
    description: 'information about the transportation',
    type: () => PartialCreateTransportationServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PartialCreateTransportationServiceDto)
  transportation: PartialCreateTransportationServiceDto;
}
