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
import { CruisesService } from './cruises.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCruiseServiceDto } from './dto/update-cruise.dto';
import { CreateCruiseServiceDto } from './dto/create-cruise.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Cruises')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'cruises', version: '1' })
export class CruisesController {
  constructor(private readonly cruisesService: CruisesService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new Cruise service' })
  @ApiBody({ type: CreateCruiseServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The Cruise service has been successfully created.',
  })
  @Post()
  createCruiseService(
    @Body(new ValidationPipe({ transform: true }))
    createCruiseServiceDto: CreateCruiseServiceDto,
  ) {
    return this.cruisesService.createCruiseService(createCruiseServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Find all Cruise services' })
  @ApiResponse({ status: 200, description: 'List of all Cruise services' })
  @Get()
  findAllCruiseServices() {
    return this.cruisesService.findAllCruiseServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one Cruise service' })
  @ApiResponse({
    status: 200,
    description: 'The found Cruise service',
  })
  @Get(':id')
  findOneCruiseService(@Param('id') id: string) {
    return this.cruisesService.findOneCruiseService(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a Cruise service' })
  @ApiResponse({
    status: 200,
    description: 'The updated Cruise service',
  })
  @Patch(':id')
  updateCruiseService(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateCruiseServiceDto: UpdateCruiseServiceDto,
  ) {
    return this.cruisesService.updateCruiseService(+id, updateCruiseServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a Cruise service' })
  @ApiResponse({
    status: 200,
    description: 'The Cruise service has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  softDeleteCruiseService(@Param('id') id: string) {
    return this.cruisesService.softDeleteCruiseService(+id);
  }
}
