import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateHotelRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateHotelRoomDto) {
  @ApiHideProperty()
  HotelId: number;
}
