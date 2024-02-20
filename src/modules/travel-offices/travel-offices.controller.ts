import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssignWholesalerDto } from './dto/assign-wholesaler.dto';
import { AddUserToTravelOfficeDto } from './dto/assign-user-travel-office.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
@ApiTags('Travel Offices')
@Controller({ path: 'travel-offices', version: '1' })
export class TravelOfficesController {
  constructor(private readonly travelOfficesService: TravelOfficesService) {}

  @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createTravelOfficeDto: CreateTravelOfficeDto) {
    return this.travelOfficesService.create(createTravelOfficeDto);
  }

  // @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @CheckAbilities({ action: Action.Read, subject: TravelOfficeEntity })
  @Get()
  findAll() {
    return this.travelOfficesService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelOfficesService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Get(':travelOfficeId/users')
  findUsersByTravelOfficeId(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findUsersByTravelOfficeId(+travelOfficeId);
  }

  @Roles(RoleEnum.admin)
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

  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelOfficeDto: UpdateTravelOfficeDto,
  ) {
    return this.travelOfficesService.update(+id, updateTravelOfficeDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.travelOfficesService.remove(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':travelOfficeId/wholesaler')
  getWholesalers(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findWholesalerByTravelOfficeId(
      +travelOfficeId,
    );
  }

  @Roles(RoleEnum.admin)
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

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id/account')
  getTravelOfficeAccount(@Request() request, @Param('id') id: string) {
    return this.travelOfficesService.getTravelOfficeAccount(
      +id,
      request.user.id,
    );
  }
}
