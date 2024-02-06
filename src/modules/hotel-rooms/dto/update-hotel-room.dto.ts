import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHotelRoomDto } from './create-hotel-room.dto';
import { Exclude, Type } from 'class-transformer';
import { UpdateServiceDto } from 'src/modules/services/dto/update-service.dto';
import { ValidateNested } from 'class-validator';

export class UpdateHotelRoomDto extends PartialType(CreateHotelRoomDto) {
  @Exclude()
  readonly hotelId: number;
}

export class UpdateHotelRoomServiceDto {
  @ApiProperty({
    description: 'information about the room',
    type: () => UpdateHotelRoomDto,
  })
  @Type(() => UpdateHotelRoomDto)
  @ValidateNested({ each: true })
  room: UpdateHotelRoomDto;

  @ApiProperty({
    description: 'information about the service',
    type: () => UpdateServiceDto,
  })
  @Type(() => UpdateServiceDto)
  @ValidateNested({ each: true })
  service: UpdateServiceDto;
}
