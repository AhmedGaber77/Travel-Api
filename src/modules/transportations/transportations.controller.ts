import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { CreateTransportationDto } from './dto/create-transportation.dto';
import { UpdateTransportationDto } from './dto/update-transportation.dto';

@Controller('transportations')
export class TransportationsController {
  constructor(private readonly transportationsService: TransportationsService) {}

  @Post()
  create(@Body() createTransportationDto: CreateTransportationDto) {
    return this.transportationsService.create(createTransportationDto);
  }

  @Get()
  findAll() {
    return this.transportationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportationDto: UpdateTransportationDto) {
    return this.transportationsService.update(+id, updateTransportationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportationsService.remove(+id);
  }
}
