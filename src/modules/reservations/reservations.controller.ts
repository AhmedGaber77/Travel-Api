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
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { UpdateReservationStatusDto } from './dto/update-status.dto';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { ReservationEntity } from './entities/reservation.entity';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { CheckAbilities } from 'src/casl/abilities.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @CheckAbilities({ action: Action.Create, subject: ReservationEntity })
  @Post()
  createReservationNew(
    @Request() req,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.createReservationNew(
      req.user.id,
      createReservationDto,
    );
  }

  @CheckAbilities({ action: Action.Read, subject: ReservationEntity })
  @Get()
  findAllReservations(@Request() req, @Query() query: QueryReservationDto) {
    return this.reservationsService.findAllReservations(req.user.id, query);
  }

  @CheckAbilities({ action: Action.Read, subject: ReservationEntity })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.reservationsService.findOneReservation(req.user.id, +id);
  }

  @Get('search/:search')
  search(@Param('search') search: string) {
    return this.reservationsService.searchReservationByTravelOffice(search);
  }

  @CheckAbilities({ action: Action.Update, subject: ReservationEntity })
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

  @CheckAbilities({ action: Action.Update, subject: ReservationEntity })
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

  @CheckAbilities({ action: Action.Delete, subject: ReservationEntity })
  @Delete(':id')
  softDeleteReservation(@Param('id') id: string) {
    return this.reservationsService.softDeleteReservation(+id);
  }

  @CheckAbilities({ action: Action.Read, subject: ReservationEntity })
  @Get(':id/travelers')
  findAllTravelers(@Request() req, @Param('id') reservationId: string) {
    return this.reservationsService.findAllTravelers(
      req.user.id,
      +reservationId,
    );
  }

  @CheckAbilities({ action: Action.Create, subject: ReservationEntity })
  @Post(':id/travelers')
  createTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Body() createTravelerDto: CreateTravelerDto,
  ) {
    return this.reservationsService.createTraveler(
      +reservationId,
      createTravelerDto,
    );
  }

  @CheckAbilities({ action: Action.Update, subject: ReservationEntity })
  @Patch(':id/travelers/:travelerId')
  updateTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
    @Body() updateTravelerDto: UpdateTravelerDto,
  ) {
    return this.reservationsService.updateTraveler(
      // req.user.id,
      +reservationId,
      +travelerId,
      updateTravelerDto,
    );
  }

  @CheckAbilities({ action: Action.Delete, subject: ReservationEntity })
  @Delete(':id/travelers/:travelerId')
  removeTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
  ) {
    return this.reservationsService.removeTraveler(
      // req.user.id,
      +reservationId,
      +travelerId,
    );
  }
}
