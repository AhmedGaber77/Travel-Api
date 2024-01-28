import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ServiceType } from '../entities/service.entity';
// import { isUnique } from 'src/validators/unique-field.validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The name of the service',
    example: 'ABC service',
  })
  // @isUnique({
  //   tableName: 'service',
  //   column: 'name',
  // })
  @IsString()
  @Min(3)
  @Max(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the service',
    example: ServiceType.HotelRooms,
    enum: ServiceType,
  })
  @IsNotEmpty()
  type: ServiceType;

  @ApiProperty({
    description: 'The description of the service',
    example: 'this is a service description',
  })
  description: string;

  @ApiProperty({
    description: 'The price per unit of the service',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    description: 'The savings of the service',
    example: 50.5,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  savings?: number;

  @ApiProperty({
    description: 'The wholesaler id of the service',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  WholesalerId: number;

  @ApiProperty({
    description: 'The destination of the service',
    example: 'New York City',
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Is this service an offer?',
    example: true,
  })
  @IsBoolean()
  isOffer: boolean;

  @ApiProperty({
    description: 'The cancelation policy of the service',
    example: 'Cancelation policy Long text',
  })
  cancelationPolicy: string;

  // @ApiProperty({
  //   description: 'The images of the service',
  //   example: [1, 2, 3],
  //   type: 'array',
  //   items: {
  //     type: 'number',
  //   },
  // })
  // images?: number[];
}
