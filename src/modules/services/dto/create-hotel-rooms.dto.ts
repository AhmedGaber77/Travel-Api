import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHotelRoomDto {
  @ApiProperty({ example: 'Deluxe', description: 'The type of the room' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional({
    example: 'Spacious room with a view',
    description: 'The description of the room',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 150, description: 'The price of the room' })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({ example: 50, description: 'The savings for the room' })
  @IsPositive()
  savings: number;

  @ApiProperty({ example: 10, description: 'The number of available rooms' })
  @IsPositive()
  availableRooms: number;

  // @ApiProperty({
  //   description: 'The id of the hotel',
  //   example: 1,
  //   required: true,
  // })
  // HotelId: number;

  // @ApiProperty({
  //   description: 'The id of the service',
  //   example: 1,
  //   required: true,
  // })
  // ServiceId: number;
}

export class CreateHotelRoomServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested()
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'The id of the hotel',
    example: 1,
    required: true,
  })
  HotelId: number;

  @ApiProperty({
    description: 'information about the room',
    type: () => CreateHotelRoomDto,
  })
  @ValidateNested()
  @Type(() => CreateHotelRoomDto)
  room: CreateHotelRoomDto;
}
