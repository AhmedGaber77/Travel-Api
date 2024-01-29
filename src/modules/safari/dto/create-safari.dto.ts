import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';

export class CreateSafariDto {
  @ApiProperty({
    type: () => String,
    description: 'Inclucions of the cruise',
    example: 'All the things',
  })
  @IsString()
  @IsNotEmpty()
  includes: string;

  @ApiProperty({
    type: () => String,
    description: 'Exclucions of the cruise',
    example: 'Nothing',
  })
  @IsString()
  @IsNotEmpty()
  excludes: string;

  @ApiProperty({
    type: () => Number,
    description: 'Days of the cruise',
    example: 1,
  })
  @IsPositive()
  @IsNotEmpty()
  days: number;

  @ApiProperty({
    type: () => Date,
    description: 'Start time of the cruise',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({
    type: () => Date,
    description: 'End time of the cruise',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({
    type: () => String,
    description: 'City of the cruise',
    example: 'Paris',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    type: () => String,
    description: 'Country of the cruise',
    example: 'France',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    type: () => String,
    description: 'Address of the cruise',
    example: '1234 Main St',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: () => Number,
    description: 'The service id of the cruise',
    example: 1,
  })
  ServiceId: ServiceEntity;
}
