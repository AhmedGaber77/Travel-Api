import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiHideProperty()
  HotelId: number;
}
