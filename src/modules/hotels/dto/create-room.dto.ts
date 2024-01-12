import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRoomDto {
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

  // @ApiProperty({ example: 1, description: 'The ID of the hotel' })
  // @IsNumber()
  // @IsNotEmpty()
  // HotelId: number;
}
