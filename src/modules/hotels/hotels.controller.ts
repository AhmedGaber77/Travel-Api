import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './hotel-rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('Hotels')
@Controller({ path: 'hotels', version: '1' })
export class HotelsController {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly roomsService: RoomsService,
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }

  @Get(':id/rooms')
  getHotelRooms(@Param('id') id: string) {
    return this.roomsService.getHotelRooms(+id);
  }

  @Get(':id/rooms/:roomId')
  getHotelRoom(@Param('id') id: string, @Param('roomId') roomId: string) {
    return this.roomsService.getHotelRoom(+id, +roomId);
  }

  @Post(':id/rooms')
  ceateHotelRoom(
    @Param('id') id: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomsService.createHotelRoom(+id, createRoomDto);
  }

  @Patch(':id/rooms/:roomId')
  updateHotelRoom(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.updateHotelRoom(+id, +roomId, updateRoomDto);
  }
}
