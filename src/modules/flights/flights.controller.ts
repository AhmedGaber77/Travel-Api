import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFlightServiceDto } from './dto/create-flight.dto';
import { UpdateFlightServiceDto } from './dto/update-flight.dto';

@ApiTags('Flights')
@Controller({ path: 'flights', version: '1' })
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @ApiOperation({ summary: 'Create a new flight service' })
  @ApiBody({ type: CreateFlightServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The flight service has been successfully created.',
  })
  @Post()
  createFlightService(
    @Body(new ValidationPipe({ transform: true }))
    createFlightServiceDto: CreateFlightServiceDto,
  ) {
    return this.flightsService.createFlightService(createFlightServiceDto);
  }

  @ApiOperation({ summary: 'Find all flight services' })
  @ApiResponse({ status: 200, description: 'List of all flight services' })
  @Get()
  findAllFlightServices() {
    return this.flightsService.findAllFlightServices();
  }

  @ApiOperation({ summary: 'Find one flight service' })
  @ApiResponse({
    status: 200,
    description: 'The found flight service',
  })
  @Get(':id')
  findOneFlightService(@Param('id') id: string) {
    return this.flightsService.findOneFlightService(+id);
  }

  @ApiOperation({ summary: 'Update a flight service' })
  @ApiResponse({
    status: 200,
    description: 'The updated flight service',
  })
  @Patch(':id')
  updateFlightService(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateFlightServiceDto: UpdateFlightServiceDto,
  ) {
    return this.flightsService.updateFlightService(+id, updateFlightServiceDto);
  }

  @ApiOperation({ summary: 'Soft delete a flight service' })
  @ApiResponse({
    status: 200,
    description: 'The flight service has been successfully deleted.',
  })
  @Delete(':id')
  softDeleteFlightService(@Param('id') id: string) {
    return this.flightsService.softDeleteFlightService(+id);
  }
}
