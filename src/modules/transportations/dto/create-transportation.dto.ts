import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';

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

  // @ApiProperty({
  //   type: () => Number,
  // })
  // ServiceId: ServiceEntity['id'];
}

export class CreateTransportationServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the transportation',
    type: () => CreateTransportationDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateTransportationDto)
  transportation: CreateTransportationDto;
}
