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
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';
import { AccountEntity } from '../accounts/entities/account.entity';

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

  @CheckAbilities({ action: Action.Read, subject: TravelOfficeEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelOfficesService.findOne(+id);
  }

  @CheckAbilities(
    { action: Action.Read, subject: TravelOfficeEntity },
    { action: Action.Read, subject: UserEntity },
  )
  @Get(':travelOfficeId/users')
  findUsersByTravelOfficeId(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findUsersByTravelOfficeId(+travelOfficeId);
  }

  @CheckAbilities(
    { action: Action.Update, subject: TravelOfficeEntity },
    { action: Action.Update, subject: UserEntity },
  )
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

  @CheckAbilities({ action: Action.Update, subject: TravelOfficeEntity })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelOfficeDto: UpdateTravelOfficeDto,
  ) {
    return this.travelOfficesService.update(+id, updateTravelOfficeDto);
  }

  @CheckAbilities({ action: Action.Delete, subject: TravelOfficeEntity })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.travelOfficesService.remove(+id);
  }

  @CheckAbilities(
    { action: Action.Read, subject: TravelOfficeEntity },
    { action: Action.Read, subject: WholesalerEntity },
  )
  @Get(':travelOfficeId/wholesaler')
  getWholesalers(@Param('travelOfficeId') travelOfficeId: string) {
    return this.travelOfficesService.findWholesalerByTravelOfficeId(
      +travelOfficeId,
    );
  }

  @CheckAbilities(
    { action: Action.Update, subject: TravelOfficeEntity },
    { action: Action.Update, subject: WholesalerEntity },
  )
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

  @CheckAbilities(
    { action: Action.Read, subject: TravelOfficeEntity },
    { action: Action.Read, subject: AccountEntity },
  )
  @Get(':id/account')
  getTravelOfficeAccount(@Request() request, @Param('id') id: string) {
    return this.travelOfficesService.getTravelOfficeAccount(
      +id,
      request.user.id,
    );
  }
}
