import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flights')
@Controller({ path: 'flights', version: '1' })
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  findAll() {
    return this.flightsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightsService.update(+id, updateFlightDto);
  }
}
