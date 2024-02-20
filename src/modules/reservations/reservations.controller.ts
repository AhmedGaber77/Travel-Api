import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  SerializeOptions,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { UpdateReservationStatusDto } from './dto/update-status.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.travelAgent)
  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  createReservation(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createReservation(
      req.user.id,
      createReservationDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @SerializeOptions({
    groups: ['me'],
  })
  @Get()
  findAllReservations(@Request() req, @Query() query: QueryReservationDto) {
    return this.reservationsService.findAllReservations(req.user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOneReservation(+id);
  }

  @Get('search/:search')
  search(@Param('search') search: string) {
    return this.reservationsService.searchReservationByTravelOffice(search);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.updateReservation(
      +id,
      updateReservationDto,
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateReservationStatusDto: UpdateReservationStatusDto,
  ) {
    return this.reservationsService.updateStatus(
      +id,
      updateReservationStatusDto,
    );
  }

  @Delete(':id')
  softDeleteReservation(@Param('id') id: string) {
    return this.reservationsService.softDeleteReservation(+id);
  }

  @Get(':id/travelers')
  findAllTravelers(@Param('id') reservationId: string) {
    return this.reservationsService.findAllTravelers(+reservationId);
  }

  @Post(':id/travelers')
  createTraveler(
    @Param('id') reservationId: string,
    @Body() createTravelerDto: CreateTravelerDto,
  ) {
    return this.reservationsService.createTraveler(
      +reservationId,
      createTravelerDto,
    );
  }

  @Patch(':id/travelers/:travelerId')
  updateTraveler(
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
    @Body() updateTravelerDto: UpdateTravelerDto,
  ) {
    return this.reservationsService.updateTraveler(
      +reservationId,
      +travelerId,
      updateTravelerDto,
    );
  }

  @Delete(':id/travelers/:travelerId')
  removeTraveler(
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
  ) {
    return this.reservationsService.removeTraveler(+reservationId, +travelerId);
  }
}
