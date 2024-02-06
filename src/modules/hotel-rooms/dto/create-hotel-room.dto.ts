import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateServiceDto } from 'src/modules/services/dto/create-service.dto';

export class CreateHotelRoomDto {
  @ApiProperty({ example: 'Deluxe', description: 'The type of the room' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 120, description: 'the area of the room' })
  @IsPositive()
  roomArea: number;

  @ApiProperty({ example: 1, description: 'the number of beds in the room' })
  @IsPositive()
  numberOfBeds: number;

  @ApiProperty({
    example: 1,
    description: 'the number of persons that can sleep in the room',
  })
  @IsPositive()
  numberOfSleeps: number;

  @ApiProperty({
    description: 'The id of the hotel',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  hotelId: number;
}

export class CreateHotelRoomServiceDto {
  @ApiProperty({
    description: 'information about the service',
    type: () => CreateServiceDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateServiceDto)
  service: CreateServiceDto;

  @ApiProperty({
    description: 'information about the room',
    type: () => CreateHotelRoomDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateHotelRoomDto)
  room: CreateHotelRoomDto;
}
