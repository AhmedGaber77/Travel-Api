import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateWholesalerDto {
  @ApiProperty({
    description: 'The name of the wholesaler',
    example: 'ABC Wholesalers',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the wholesaler',
    example: 'contact@abcwholesalers.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The phone number of the wholesaler',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The mobile phone number of the wholesaler',
    example: '+201234567890',
  })
  @IsOptional()
  mobilePhone?: string;

  @ApiProperty({
    description: 'The address of the wholesaler',
    example: '123 Wholesaler St.',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'The city where the wholesaler is located',
    example: 'Wholesale City',
  })
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'The state where the wholesaler is located',
    example: 'WS',
  })
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'The country where the wholesaler is located',
    example: 'Wholesalia',
  })
  @IsOptional()
  country?: string;

  @ApiProperty({
    description: "The postal code for the wholesaler's location",
    example: '12345',
  })
  @IsOptional()
  postalCode?: string;

  @ApiProperty({
    description: 'Additional contact information for the wholesaler',
    type: 'object',
  })
  @IsOptional()
  contactInfo: any;
}
