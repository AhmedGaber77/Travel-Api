import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { StandardPackagesService } from './standard-packages.service';
import { CreateStandardPackageServiceDto } from './dto/create-standard-package.dto';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { UpdateStandardPackageServiceDto } from './dto/update-standard-package.dto';

@ApiTags('Standard Packages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'standard-packages', version: '1' })
@Controller('standard-packages')
export class StandardPackagesController {
  constructor(
    private readonly standardPackagesService: StandardPackagesService,
  ) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new standard package service' })
  @ApiBody({ type: CreateStandardPackageServiceDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The standard package service has been successfully created.',
  })
  @Post()
  async createStandardPackageService(
    @Body(new ValidationPipe({ transform: true }))
    createStandardPackageServiceDto: CreateStandardPackageServiceDto,
  ) {
    return await this.standardPackagesService.createStandardPackageService(
      createStandardPackageServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all standard package services' })
  @ApiResponse({
    status: 200,
    description: 'List of all standard package services',
  })
  @Get()
  async findAllStandardPackageServices() {
    return await this.standardPackagesService.findAllStandardPackageServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one standard package service' })
  @ApiResponse({
    status: 200,
    description: 'The found standard package service',
  })
  @Get(':id')
  async findOneStandardPackageService(@Param('id') id: number) {
    return await this.standardPackagesService.findOneStandardPackageService(
      +id,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a standard package service' })
  @ApiBody({ type: UpdateStandardPackageServiceDto })
  @ApiResponse({
    status: 200,
    description: 'The standard package service has been successfully updated.',
  })
  @Patch(':id')
  async updateStandardPackageService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateStandardPackageServiceDto: UpdateStandardPackageServiceDto,
  ) {
    return await this.standardPackagesService.updateStandardPackageService(
      id,
      updateStandardPackageServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a standard package service' })
  @ApiResponse({
    status: 204,
    description: 'The standard package service has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async softDeleteStandardPackageService(@Param('id') id: number) {
    return await this.standardPackagesService.softDeleteStandardPackageService(
      +id,
    );
  }
}
