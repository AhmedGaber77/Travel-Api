import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';

export class CreateCruiseDto {
  @ApiPropertyOptional({
    type: () => String,
    description: 'Description of the cruise',
    example: 'The best cruise in the world',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: () => String,
    description: 'City of the cruise',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  depratureCity: string;

  @ApiProperty({
    type: () => String,
    description: 'Country of the cruise',
    example: 'United States',
  })
  @IsString()
  @IsNotEmpty()
  depratureCountry: string;

  @ApiProperty({
    type: () => String,
    description: 'Address of the cruise',
    example: '1234 Main St',
  })
  @IsString()
  @IsNotEmpty()
  depratureAddress: string;

  @ApiProperty({
    type: () => Date,
    description: 'Departure time of the cruise',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  depratureTime: Date;

  @ApiProperty({
    type: () => Date,
    description: 'Arrival time of the cruise',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({
    type: () => String,
    description: 'Type of the cabin',
    example: 'Business',
  })
  @IsString()
  @IsNotEmpty()
  cabinType: string;

  @ApiProperty({
    type: () => Number,
    description: 'Number of available seats',
    example: 10,
  })
  @IsPositive()
  @IsNotEmpty()
  availableSeats: number;

  @ApiProperty({
    type: () => Number,
    description: 'The id of the service',
    example: 1,
  })
  @IsNotEmpty()
  ServiceId: ServiceEntity['id'];
}
