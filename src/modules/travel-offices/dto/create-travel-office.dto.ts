import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  email: string;

  @ApiProperty({
    description: 'The phone number of the travel office',
    example: '+1234567890',
  })
  // @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

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

  @ApiProperty({
    description: "The postal code for the travel office's location",
    example: '12345',
  })
  @IsOptional()
  postalCode: string;

  @ApiProperty({
    description: 'Additional contact information for the travel office',
    type: 'object',
  })
  @IsOptional()
  contactInfo: any;

  constructor(partial: Partial<CreateTravelOfficeDto>) {
    Object.assign(this, partial);
  }
}
