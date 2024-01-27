import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';

export class CreateTransportationDto {
  @ApiProperty({
    type: () => String,
    description: 'Type of transportation',
    example: 'car',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({
    type: () => String,
    description: 'Description of transportation',
    example: 'Car rental',
  })
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: () => String,
    description: 'Departure address of transportation',
    example: '1234 Main St',
  })
  @IsString()
  departureAddress?: string;

  @ApiPropertyOptional({
    type: () => String,
    description: 'Arrival address of transportation',
    example: '1234 Main St',
  })
  @IsString()
  arrivalAddress?: string;

  @ApiPropertyOptional({
    type: () => Date,
    description: 'Departure time of transportation',
    example: '2022-01-01T00:00:00.000Z',
  })
  departureTime?: Date;

  @ApiPropertyOptional({
    type: () => Date,
    description: 'Arrival time of transportation',
    example: '2022-01-01T00:00:00.000Z',
  })
  arrivalTime?: Date;

  @ApiPropertyOptional({
    type: () => Date,
    description: 'Departing date of transportation',
    example: '2022-01-01T00:00:00.000Z',
  })
  departingDate?: Date;

  @ApiPropertyOptional({
    type: () => Date,
    description: 'Returning date of transportation',
    example: '2022-01-01T00:00:00.000Z',
  })
  returningDate?: Date;

  @ApiProperty({
    type: () => Number,
  })
  ServiceId: ServiceEntity['id'];
}
