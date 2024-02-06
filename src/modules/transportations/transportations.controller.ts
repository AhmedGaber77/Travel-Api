import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransportationServiceDto } from './dto/create-transportation.dto';
import { UpdateTransportationServiceDto } from './dto/update-transportation.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Transportations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'transportations', version: '1' })
export class TransportationsController {
  constructor(
    private readonly transportationsService: TransportationsService,
  ) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new Transportation service' })
  @ApiBody({ type: CreateTransportationServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The Transportation service has been successfully created.',
  })
  @Post()
  createTransportationService(
    @Body(new ValidationPipe({ transform: true }))
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    return this.transportationsService.createTransportationService(
      createTransportationServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all Transportation services' })
  @ApiResponse({
    status: 200,
    description: 'List of all Transportation services',
  })
  @Get()
  findAllTransportationServices() {
    return this.transportationsService.findAllTransportationServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one Transportation service' })
  @ApiResponse({
    status: 200,
    description: 'The found Transportation service',
  })
  @Get(':id')
  findOneTransportationService(@Param('id') id: string) {
    return this.transportationsService.findOneTransportationService(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a Transportation service' })
  @ApiResponse({
    status: 200,
    description: 'The updated Transportation service',
  })
  @Patch(':id')
  updateTransportationService(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateTransportationServiceDto: UpdateTransportationServiceDto,
  ) {
    return this.transportationsService.updateTransportationService(
      +id,
      updateTransportationServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a Transportation service' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Transportation service has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  softDeleteTransportationService(@Param('id') id: string) {
    return this.transportationsService.softDeleteTransportationService(+id);
  }
}
