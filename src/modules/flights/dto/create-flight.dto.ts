import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CityEntity } from 'src/modules/cities/entities/city.entity';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';
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
  departureLocation: string;

  @ApiProperty({
    example: 'Arrival City',
    description: 'The arrival location',
  })
  @IsString()
  arrivalLocation: string;

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
    example: 1,
    description: 'The ID of the departure city',
  })
  @IsNumber()
  DepartureCityId: CityEntity['id'];

  @ApiProperty({
    example: 2,
    description: 'The ID of the arrival city',
  })
  @IsNumber()
  ArrivalCityId: CityEntity['id'];

  @ApiProperty({
    example: 3,
    description: 'The ID of the service',
  })
  @IsNumber()
  ServiceId: ServiceEntity['id'];

  @ApiProperty({
    description: 'The ID of the airplane',
    type: [CreateSeatDto],
  })
  @IsOptional()
  @ValidateNested()
  seats?: CreateSeatDto[];
}
