import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { CreateFlightServiceDto } from './dto/create-flight-service.dto';

@ApiTags('Services')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('hotel-rooms')
  async findAllHotelRoomServices() {
    return this.servicesService.findAllHotelRoomServices();
  }

  @Post('hotel-rooms')
  async createHotelRoomService(
    @Body(new ValidationPipe({ transform: true }))
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    return await this.servicesService.createHotelRoomService(
      createHotelRoomServiceDto,
    );
  }

  @Get('flights')
  async findAllFlightServices() {
    return this.servicesService.findAllFlightServices();
  }
  @Post('flights')
  async createFlightService(
    @Body(new ValidationPipe({ transform: true }))
    createFlightServiceDto: CreateFlightServiceDto,
  ) {
    return await this.servicesService.createFlightService(
      createFlightServiceDto,
    );
  }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
