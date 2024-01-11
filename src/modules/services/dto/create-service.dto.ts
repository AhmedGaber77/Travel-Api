import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ServiceType } from '../entities/service.entity';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The name of the service',
    example: 'ABC service',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the service',
    example: 'hotel',
    type: 'enum',
    enum: ServiceType,
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'The description of the service',
    example: 'this is a service description',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The price per unit of the service',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The savings of the service',
    example: 50.5,
  })
  @IsNumber()
  savings: number;

  @ApiProperty({
    description: 'The package id of the service',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  PackageId: number;

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
    default: false,
    required: false,
    enum: [true, false],
    enumName: 'IsOffer',
  })
  @IsBoolean()
  @IsOptional()
  isOffer: boolean;

  @ApiProperty({
    description: 'The cancelation policy of the service',
    example: 'Cancelation policy Long text',
  })
  cancelationPolicy: string;
}
