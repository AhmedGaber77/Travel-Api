import { Controller, Get, Param } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flights')
@Controller({ path: 'services/flights', version: '1' })
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  // @Get()
  // findAll() {
  //   return this.flightsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
  //   return this.flightsService.update(+id, updateFlightDto);
  // }
}
