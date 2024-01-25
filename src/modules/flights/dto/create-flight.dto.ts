import { IsDateString, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
    type: () => Number,
    description: 'The number of available seats',
    example: 3,
  })
  @IsPositive()
  @Min(1)
  availableSeats: number;

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
