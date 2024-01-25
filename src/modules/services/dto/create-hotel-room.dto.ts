import { ApiProperty } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHotelRoomDto } from 'src/modules/hotels/dto/create-room.dto';

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
