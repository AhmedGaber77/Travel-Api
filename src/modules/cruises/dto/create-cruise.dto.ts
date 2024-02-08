import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';

export class CreateCruiseDto {
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

  // @ApiProperty({
  //   type: () => Number,
  //   description: 'Number of available seats',
  //   example: 10,
  // })
  // @IsPositive()
  // @IsNotEmpty()
  // availableSeats: number;

  // @ApiProperty({
  //   type: () => Number,
  //   description: 'The id of the service',
  //   example: 1,
  // })
  // @IsNotEmpty()
  // ServiceId: ServiceEntity['id'];
}

export class CreateCruiseServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the cruise',
    type: () => CreateCruiseDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateCruiseDto)
  cruise: CreateCruiseDto;
}
