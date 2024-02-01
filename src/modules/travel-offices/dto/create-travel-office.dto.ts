import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { isUnique } from 'src/validators/unique-field.validator';

export class CreateTravelOfficeDto {
  @ApiProperty({
    description: 'The name of the travel office',
    example: 'ABC travel offices',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the travel office',
    example: 'contact@abctraveloffices.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @isUnique({
    tableName: 'travel_office',
    column: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the travel office',
    example: '+1234567890',
  })
  @isUnique({
    tableName: 'travel_office',
    column: 'phone',
  })
  // @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    description: 'The Profile photo id of the travel office',
    example: 1,
  })
  @IsNotEmpty()
  profilePhotoId: number;

  @ApiProperty({
    description: 'The address of the travel office',
    example: '123 travel office St.',
  })
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'The city where the travel office is located',
    example: 'Wholesale City',
  })
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'The state where the travel office is located',
    example: 'WS',
  })
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'The country where the travel office is located',
    example: 'Wholesalia',
  })
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: "The postal code for the travel office's location",
    example: '12345',
  })
  @IsOptional()
  postalCode?: string;

  @ApiProperty({
    description: 'The ID of the wholesaler that owns the travel office',
    example: 1,
  })
  @IsPositive()
  WholesalerId: number;
}
