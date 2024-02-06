import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomServiceDto } from './dto/update-hotel-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Hotel Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'hotel-rooms', version: '1' })
export class HotelRoomsController {
  constructor(private readonly roomsService: HotelRoomsService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new hotel room service' })
  @ApiBody({ type: CreateHotelRoomServiceDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The hotel room service has been successfully created.',
  })
  @Post()
  async createHotelRoomService(
    @Body(new ValidationPipe({ transform: true }))
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    return await this.roomsService.createHotelRoomService(
      createHotelRoomServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all hotel room services' })
  @ApiResponse({ status: 200, description: 'List of all hotel room services' })
  @Get()
  async findAllHotelRoomServices() {
    return await this.roomsService.findAllHotelRoomServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one hotel room service' })
  @ApiResponse({
    status: 200,
    description: 'The found hotel room service',
  })
  @Get(':id')
  async findOneHotelRoomService(@Param('id') id: number) {
    return await this.roomsService.findOneHotelRoomService(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a hotel room service' })
  @ApiBody({ type: UpdateHotelRoomServiceDto })
  @ApiResponse({
    status: 200,
    description: 'The hotel room service has been successfully updated.',
  })
  @Patch(':id')
  async updateHotelRoomService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateHotelRoomServiceDto: UpdateHotelRoomServiceDto,
  ) {
    return await this.roomsService.updateHotelRoomService(
      id,
      updateHotelRoomServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a hotel room service' })
  @ApiResponse({
    status: 204,
    description: 'The hotel room service has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async softDeleteHotelRoomService(@Param('id') id: number) {
    return await this.roomsService.softDeleteHotelRoomService(+id);
  }
}
