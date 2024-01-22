import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRoomDto } from './create-room.dto';

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
  })
  @IsString()
  // @IsPostalCode()
  zipCode: string;

  @ApiProperty({
    description: 'The phone number of the hotel',
    example: '+1234567890',
  })
  @IsString()
  // @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    description: 'The website of the hotel',
    example: 'www.abchotel.com',
  })
  @IsString()
  website: string;

  @ApiProperty({
    description: 'The email address of the hotel',
    example: '<EMAIL>',
    required: false,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The description of the hotel',
    example: 'This is a description of the hotel',
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  // @ApiProperty({
  //   description: 'The rooms of the hotel',
  //   type: [CreateRoomDto],
  // })
  // @ValidateNested()
  // @IsOptional()
  // rooms?: CreateRoomDto[];
}
