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
// import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { CreateFlightServiceDto } from './dto/create-flight-service.dto';
import { CreateTransportationServiceDto } from './dto/create-transportation-service.dto';
import { CreateCruiseServiceDto } from './dto/create-cruise-service.dto';
import { CreateSafariServiceDto } from './dto/create-safari-service.dto';

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

  @Get('transportations')
  async findAllTransportationServices() {
    return this.servicesService.findAllTransportationServices();
  }

  @Post('transportations')
  async createTransportationService(
    @Body(new ValidationPipe({ transform: true }))
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    return await this.servicesService.createTransportationService(
      createTransportationServiceDto,
    );
  }

  @Get('cruises')
  async findAllCruiseServices() {
    return this.servicesService.findAllCruiseServices();
  }

  @Post('cruises')
  async createCruiseService(
    @Body(new ValidationPipe({ transform: true }))
    createCruiseServiceDto: CreateCruiseServiceDto,
  ) {
    return await this.servicesService.createCruiseService(
      createCruiseServiceDto,
    );
  }

  @Get('safari')
  async findAllSafariServices() {
    return this.servicesService.findAllSafariServices();
  }

  @Post('safari')
  async createSafariService(
    @Body(new ValidationPipe({ transform: true }))
    createSafariServiceDto: CreateSafariServiceDto,
  ) {
    return await this.servicesService.createSafariService(
      createSafariServiceDto,
    );
  }

  // @Post()
  // create(@Body() createServiceDto: CreateServiceDto) {
  //   return this.servicesService.create(createServiceDto);
  // }

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
