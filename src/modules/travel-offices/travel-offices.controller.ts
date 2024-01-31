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
} from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';
import { ApiTags } from '@nestjs/swagger';
import { AssignWholesalerDto } from './dto/assign-wholesaler.dto';
import { AddUserToTravelOfficeDto } from './dto/assign-user-travel-office.dto';

@ApiTags('Travel Offices')
@Controller({ path: 'travel-offices', version: '1' })
export class TravelOfficesController {
  constructor(private readonly travelOfficesService: TravelOfficesService) {}

  @Post()
  create(@Body() createTravelOfficeDto: CreateTravelOfficeDto) {
    return this.travelOfficesService.create(createTravelOfficeDto);
  }

  @Get()
  findAll() {
    return this.travelOfficesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelOfficesService.findOne(+id);
  }

  @Get(':travelOfficeId/users')
  findUsersByTravelOfficeId(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findUsersByTravelOfficeId(+travelOfficeId);
  }

  @Post(':travelOfficeId/users')
  assignUserToTravelOffice(
    @Param('travelOfficeId') travelOfficeId: string,
    @Body() assignWholesalerDto: AddUserToTravelOfficeDto,
  ) {
    return this.travelOfficesService.assignUserToTravelOffice(
      +travelOfficeId,
      assignWholesalerDto.userId,
    );
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelOfficeDto: UpdateTravelOfficeDto,
  ) {
    return this.travelOfficesService.update(+id, updateTravelOfficeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.travelOfficesService.remove(+id);
  }

  @Get(':travelOfficeId/wholesaler')
  getWholesalers(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findWholesalerByTravelOfficeId(
      +travelOfficeId,
    );
  }

  @Post(':travelOfficeId/wholesaler')
  addWholesaler(
    @Param('travelOfficeId') travelOfficeId: string,
    @Body() assignWholesalerDto: AssignWholesalerDto,
  ) {
    return this.travelOfficesService.assignWholesalerToTravelOffice(
      +travelOfficeId,
      +assignWholesalerDto.wholesalerId,
    );
  }
}
