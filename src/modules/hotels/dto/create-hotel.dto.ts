import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    description: 'The name of the hotel',
    example: 'ABC Hotel',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The address of the hotel',
    example: '123 ABC Street',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'The stars of the hotel',
    example: 5,
  })
  @IsPositive()
  @Min(0)
  @Max(5)
  stars: number;

  @ApiProperty({
    description: 'The city of the hotel',
    example: 'ABC City',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'The state of the hotel',
    example: 'AB',
  })
  @IsString()
  state: string;

  @ApiProperty({
    description: 'The zip code of the hotel',
    example: '12345',
    required: false,
    nullable: true,
  })
  @IsString()
  zipCode: string;

  @ApiProperty({
    description: 'The phone number of the hotel',
    example: '+201234567890',
    required: false,
  })
  @IsString()
  @IsPhoneNumber()
  mobileNumber: string;

  @ApiProperty({
    description: 'The phone number of the hotel',
    example: '03417589',
    required: false,
    nullable: true,
  })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'The website of the hotel',
    example: 'www.abchotel.com',
    required: false,
    nullable: true,
  })
  @IsString()
  website?: string;

  @ApiProperty({
    description: 'The email address of the hotel',
    example: '<EMAIL>',
    required: false,
    nullable: true,
  })
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'The description of the hotel',
    example: 'This is a description of the hotel',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The image ids of the hotel',
    example: [1, 2, 3],
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsPositive({ each: true })
  imageIds?: number[];
}
