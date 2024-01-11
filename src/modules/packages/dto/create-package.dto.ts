import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({
    description: 'The name of the package',
    example: 'ABC Package',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the package',
    example: 'This package is for honeymoon',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The price per unit of the package',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The savings of the package',
    example: 50.5,
  })
  @IsNumber()
  savings: number;

  @ApiProperty({
    description: 'The wholesaler id of the package',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  WholesalerId: number;

  @ApiProperty({
    description: 'The destination of the package',
    example: 'New York City',
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Is this package an offer?',
    example: true,
    default: false,
    required: false,
    enum: [true, false],
    enumName: 'IsOffer',
  })
  @IsBoolean()
  @IsOptional()
  isOffer: boolean;
}
