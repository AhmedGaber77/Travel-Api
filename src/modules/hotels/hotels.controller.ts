import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateHotelRoomDto } from '../hotel-rooms/dto/update-hotel-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Hotels')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'hotels', version: '1' })
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiBody({ type: CreateHotelDto })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created.',
  })
  @Post()
  createHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.createHotel(createHotelDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all hotels' })
  @ApiResponse({ status: 200, description: 'List of all hotels' })
  @Get()
  findAllHotels() {
    return this.hotelsService.findAllHotels();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one hotel' })
  @ApiResponse({
    status: 200,
    description: 'The found hotel',
  })
  @Get(':id')
  findOneHotel(@Param('id') id: string) {
    return this.hotelsService.findOneHotel(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a hotel' })
  @ApiResponse({
    status: 200,
    description: 'The updated hotel',
  })
  @Patch(':id')
  updateHotel(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.updateHotel(+id, updateHotelDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a hotel' })
  @ApiResponse({ status: 200, description: 'The deleted hotel' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  softDeleteHotel(@Param('id') id: string) {
    return this.hotelsService.softDeleteHotel(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all rooms for a hotel' })
  @ApiResponse({ status: 200, description: 'List of all rooms for a hotel' })
  @Get(':id/rooms')
  findManyHotelRooms(@Param('id') id: string) {
    return this.hotelsService.findManyHotelRoomsbyHotelId(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one room for a hotel' })
  @ApiResponse({
    status: 200,
    description: 'The found room for a hotel',
  })
  @Get(':id/rooms/:roomId')
  findOneHotelRoom(@Param('id') id: string, @Param('roomId') roomId: string) {
    return this.hotelsService.findOneHotelRoombyHotelId(+id, +roomId);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a room for a hotel' })
  @ApiResponse({
    status: 200,
    description: 'The updated room for a hotel',
  })
  @Patch(':id/rooms/:roomId')
  updateHotelRoom(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateHotelRoomDto,
  ) {
    return this.hotelsService.updateHotelRoombyHotelId(
      +id,
      +roomId,
      updateRoomDto,
    );
  }
}
