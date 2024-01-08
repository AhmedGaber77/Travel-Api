import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';

@Controller('travel-offices')
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelOfficeDto: UpdateTravelOfficeDto) {
    return this.travelOfficesService.update(+id, updateTravelOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelOfficesService.remove(+id);
  }
}
