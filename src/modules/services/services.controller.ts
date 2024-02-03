import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  UpdateCruiseServiceDto,
  UpdateFlightServiceDto,
  UpdateHotelRoomServiceDto,
  UpdateSafariServiceDto,
  UpdateServiceDto,
  UpdateTransportationServiceDto,
} from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { CreateFlightServiceDto } from './dto/create-flight-service.dto';
import { CreateTransportationServiceDto } from './dto/create-transportation-service.dto';
import { CreateCruiseServiceDto } from './dto/create-cruise-service.dto';
import { CreateSafariServiceDto } from './dto/create-safari-service.dto';
import { QueryServiceDto } from './dto/query-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Services')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('hotel-rooms')
  async findAllHotelRoomServices() {
    return this.servicesService.findAllHotelRoomServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('hotel-rooms')
  async createHotelRoomService(
    @Body(new ValidationPipe({ transform: true }))
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    return await this.servicesService.createHotelRoomService(
      createHotelRoomServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('hotel-rooms/:id')
  async updateHotelRoomService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateHotelRoomServiceDto: UpdateHotelRoomServiceDto,
  ) {
    return await this.servicesService.updateHotelRoomService(
      id,
      updateHotelRoomServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('flights')
  async findAllFlightServices() {
    return this.servicesService.findAllFlightServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('flights')
  async createFlightService(
    @Body(new ValidationPipe({ transform: true }))
    createFlightServiceDto: CreateFlightServiceDto,
  ) {
    return await this.servicesService.createFlightService(
      createFlightServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('flights/:id')
  async updateFlightService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateFlightServiceDto: UpdateFlightServiceDto,
  ) {
    return await this.servicesService.updateFlightService(
      id,
      updateFlightServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('transportations')
  async findAllTransportationServices() {
    return this.servicesService.findAllTransportationServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('transportations')
  async createTransportationService(
    @Body(new ValidationPipe({ transform: true }))
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    return await this.servicesService.createTransportationService(
      createTransportationServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('transportations/:id')
  async updateTransportationService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateTransportationServiceDto: UpdateTransportationServiceDto,
  ) {
    return await this.servicesService.updateTransportationService(
      id,
      updateTransportationServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('cruises')
  async findAllCruiseServices() {
    return this.servicesService.findAllCruiseServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('cruises')
  async createCruiseService(
    @Body(new ValidationPipe({ transform: true }))
    createCruiseServiceDto: CreateCruiseServiceDto,
  ) {
    return await this.servicesService.createCruiseService(
      createCruiseServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('cruises/:id')
  async updateCruiseService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateCruiseServiceDto: UpdateCruiseServiceDto,
  ) {
    return await this.servicesService.updateCruiseService(
      id,
      updateCruiseServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('safari')
  async findAllSafariServices() {
    return this.servicesService.findAllSafariServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('safari')
  async createSafariService(
    @Body(new ValidationPipe({ transform: true }))
    createSafariServiceDto: CreateSafariServiceDto,
  ) {
    return await this.servicesService.createSafariService(
      createSafariServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('safari/:id')
  async updateSafariService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateSafariServiceDto: UpdateSafariServiceDto,
  ) {
    return await this.servicesService.updateSafariService(
      id,
      updateSafariServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get()
  findAll(@Query() query: QueryServiceDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return this.servicesService.findAll({
      page,
      limit,
    });
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
