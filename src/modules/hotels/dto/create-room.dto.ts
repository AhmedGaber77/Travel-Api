import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateHotelRoomDto {
  @ApiProperty({ example: 'Deluxe', description: 'The type of the room' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 120, description: 'the area of the room' })
  @Column({ type: Number })
  @IsPositive()
  roomArea: number;

  @ApiProperty({ example: 1, description: 'the number of beds in the room' })
  @Column({ type: Number })
  @IsPositive()
  numberOfBeds: number;

  @ApiProperty({
    example: 1,
    description: 'the number of persons that can sleep in the room',
  })
  @Column({ type: Number })
  @IsPositive()
  numberOfSleeps: number;

  @ApiProperty({
    description: 'The id of the hotel',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  HotelId: number;
}
