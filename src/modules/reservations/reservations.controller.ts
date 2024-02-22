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
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles(RoleEnum.travelAgent)
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

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get()
  findAllReservations(@Request() req, @Query() query: QueryReservationDto) {
    return this.reservationsService.findAllReservations(req.user.id, query);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.reservationsService.findOneReservation(req.user.id, +id);
  }

  // @Get('search/:search')
  // search(@Param('search') search: string) {
  //   return this.reservationsService.searchReservationByTravelOffice(search);
  // }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.updateReservation(
      req.user.id,
      +id,
      updateReservationDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch(':id/cancel')
  cancelReservation(
    @Param('id') id: string,
    @Body() cancelReservationDto: CancelReservationDto,
  ) {
    return this.reservationsService.cancelReservation(
      +id,
      cancelReservationDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch(':id/confirm')
  confirmReservation(@Param('id') id: string) {
    return this.reservationsService.confirmReservation(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.travelAgent)
  @Delete(':id')
  softDeleteReservation(@Request() req, @Param('id') id: string) {
    return this.reservationsService.softDeleteReservation(req.user.id, +id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id/travelers')
  findAllTravelers(@Request() req, @Param('id') reservationId: string) {
    return this.reservationsService.findAllTravelers(
      req.user.id,
      +reservationId,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Post(':id/travelers')
  createTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Body() createTravelerDto: CreateTravelerDto,
  ) {
    return this.reservationsService.createTraveler(
      req.user.id,
      +reservationId,
      createTravelerDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Patch(':id/travelers/:travelerId')
  updateTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
    @Body() updateTravelerDto: UpdateTravelerDto,
  ) {
    return this.reservationsService.updateTraveler(
      req.user.id,
      +reservationId,
      +travelerId,
      updateTravelerDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Delete(':id/travelers/:travelerId')
  removeTraveler(
    @Request() req,
    @Param('id') reservationId: string,
    @Param('travelerId') travelerId: string,
  ) {
    return this.reservationsService.removeTraveler(
      req.user.id,
      +reservationId,
      +travelerId,
    );
  }
}
