import { IsDateString, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';
import { Type } from 'class-transformer';
export class CreateFlightDto {
  @ApiProperty({
    example: 'Airline Name',
    description: 'The name of the airline',
  })
  @IsString()
  airline: string;

  @ApiProperty({
    example: 'Departure City',
    description: 'The departure location',
  })
  @IsString()
  departureAddress: string;

  @ApiProperty({
    example: 'Arrival City',
    description: 'The arrival location',
  })
  @IsString()
  arrivalAddress: string;

  @ApiProperty({
    example: '2022-01-01T10:00:00Z',
    description: 'The departure time',
  })
  @IsDateString()
  departureTime: Date;

  @ApiProperty({
    example: '2022-01-01T12:00:00Z',
    description: 'The arrival time',
  })
  @IsDateString()
  arrivalTime: Date;

  @ApiProperty({
    type: () => String,
    description: 'The type of the seat',
    example: 'Business',
  })
  @IsString()
  seatType: string;

  @ApiPropertyOptional({
    type: () => String,
    description: 'The description of the seat',
    example: 'Business seat',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    type: () => String,
    description: 'The departure city',
    example: 'New York',
  })
  @IsString()
  departureCity: string;

  @ApiProperty({
    type: () => String,
    description: 'The arrival city',
    example: 'New Jersey',
  })
  @IsString()
  arrivalCity: string;
}

export class CreateFlightServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'inormation about the flight',
    type: () => CreateFlightDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateFlightDto)
  flight: CreateFlightDto;
}
