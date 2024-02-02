import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ServiceType } from '../entities/service.entity';
import { isUnique } from 'src/validators/unique-field.validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'The name of the service',
    example: 'ABC service',
  })
  @isUnique({
    tableName: 'service',
    column: 'name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the service',
    example: ServiceType.HotelRooms,
    type: () => String,
    enum: ServiceType,
  })
  @IsNotEmpty()
  type: ServiceType;

  @ApiProperty({
    description: 'The description of the service',
    example: 'this is a service description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The price per unit of the service',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: () => Number,
    description: 'The quantity available of the service',
    example: 10,
  })
  @IsNotEmpty()
  @IsPositive()
  quantityAvailable: number;

  @ApiPropertyOptional({
    description: 'The savings of the service',
    example: 50.5,
  })
  @IsNumber()
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

  // @ApiProperty({
  //   description: 'The images of the service',
  //   type: [GalleryEntity],
  // })
  // @IsArray()
  // @Type(() => GalleryEntity)
  // @IsNotEmpty()
  // @ValidateNested({ each: true })
  // images: GalleryEntity[];

  @ApiProperty({
    description: 'The image ids of the service',
    example: [1, 2, 3],
    type: 'array',
    items: {
      type: 'number',
    },
  })
  @IsArray()
  imageIds: number[];

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
