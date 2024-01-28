import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateHotelRoomDto } from 'src/modules/hotels/dto/create-room.dto';
import { CreateFlightDto } from 'src/modules/flights/dto/create-flight.dto';
import { CreateCruiseDto } from 'src/modules/cruises/dto/create-cruise.dto';
import { CreateSafariDto } from 'src/modules/safari/dto/create-safari.dto';
import { CreateTransportationDto } from 'src/modules/transportations/dto/create-transportation.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiHideProperty()
  WholesalerId: number;
}

export class PartialCreateServiceDto extends PartialType(CreateServiceDto) {}
export class PartialCreateHotelRoomDto extends PartialType(
  CreateHotelRoomDto,
) {}
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

export class UpdateHotelRoomServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => PartialCreateServiceDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateServiceDto)
  service: PartialCreateServiceDto;

  @ApiProperty({
    description: 'The id of the hotel',
    example: 1,
    required: true,
  })
  HotelId: number;

  @ApiProperty({
    description: 'information about the room',
    type: () => PartialCreateHotelRoomDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateHotelRoomDto)
  room: PartialCreateHotelRoomDto;
}

export class UpdateFlightServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => PartialCreateServiceDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateServiceDto)
  service: PartialCreateServiceDto;

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
  @ValidateNested()
  @Type(() => PartialCreateFlightServiceDto)
  flight: PartialCreateFlightServiceDto;
}

export class UpdateCruiseServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => PartialCreateServiceDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateServiceDto)
  service: PartialCreateServiceDto;

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
  @ValidateNested()
  @Type(() => PartialCreateCruiseServiceDto)
  cruise: PartialCreateCruiseServiceDto;
}

export class UpdateSafariServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => PartialCreateServiceDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateServiceDto)
  service: PartialCreateServiceDto;

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
  @ValidateNested()
  @Type(() => PartialCreateSafariServiceDto)
  safari: PartialCreateSafariServiceDto;
}

export class UpdateTransportationServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => PartialCreateServiceDto,
  })
  @ValidateNested()
  @Type(() => PartialCreateServiceDto)
  service: PartialCreateServiceDto;

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
  @ValidateNested()
  @Type(() => PartialCreateTransportationServiceDto)
  transportation: PartialCreateTransportationServiceDto;
}
