import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFlightServiceDto } from './dto/create-flight.dto';
import { UpdateFlightServiceDto } from './dto/update-flight.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Flights')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'flights', version: '1' })
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
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

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all flight services' })
  @ApiResponse({ status: 200, description: 'List of all flight services' })
  @Get()
  findAllFlightServices() {
    return this.flightsService.findAllFlightServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one flight service' })
  @ApiResponse({
    status: 200,
    description: 'The found flight service',
  })
  @Get(':id')
  findOneFlightService(@Param('id') id: string) {
    return this.flightsService.findOneFlightService(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
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

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
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
