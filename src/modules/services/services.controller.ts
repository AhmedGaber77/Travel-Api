import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import {
  UpdateCruiseServiceDto,
  UpdateServiceDto,
  UpdateStandardPackageServiceDto,
  UpdateTransportationServiceDto,
} from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTransportationServiceDto } from './dto/create-transportation-service.dto';
import { CreateCruiseServiceDto } from './dto/create-cruise-service.dto';
import { QueryServiceDto } from './dto/query-service.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { CreateStandardPackageServiceDto } from './dto/create-standard-package-service.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Services')
@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiTags('Standard Packages')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('standard-packages')
  async createStandardPackageService(
    @Body(new ValidationPipe({ transform: true }))
    createStandardPackageServiceDto: CreateStandardPackageServiceDto,
  ) {
    return await this.servicesService.createStandardPackageService(
      createStandardPackageServiceDto,
    );
  }

  @ApiTags('Standard Packages')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('standard-packages')
  async findAllStandardPackageServices() {
    return this.servicesService.findAllStandardPackageServices();
  }

  @ApiTags('Standard Packages')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('standard-packages/:id')
  async findOneStandardPackageService(@Param('id') id: number) {
    return this.servicesService.findOneService(id, 'standardPackage');
  }

  @ApiTags('Standard Packages')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('standard-packages/:id')
  async updateStandardPackageService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateStandardPackageServiceDto: UpdateStandardPackageServiceDto,
  ) {
    return await this.servicesService.updateStandardPackageService(
      id,
      updateStandardPackageServiceDto,
    );
  }

  @ApiTags('Transportations')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('transportations')
  async findAllTransportationServices() {
    return this.servicesService.findAllTransportationServices();
  }

  @ApiTags('Transportations')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('transportations')
  async createTransportationService(
    @Body(new ValidationPipe({ transform: true }))
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    return await this.servicesService.createTransportationService(
      createTransportationServiceDto,
    );
  }

  @ApiTags('Transportations')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('transportations/:id')
  async updateTransportationService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateTransportationServiceDto: UpdateTransportationServiceDto,
  ) {
    return await this.servicesService.updateTransportationService(
      id,
      updateTransportationServiceDto,
    );
  }

  @ApiTags('Cruises')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get('cruises')
  async findAllCruiseServices() {
    return this.servicesService.findAllCruiseServices();
  }

  @ApiTags('Cruises')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Post('cruises')
  async createCruiseService(
    @Body(new ValidationPipe({ transform: true }))
    createCruiseServiceDto: CreateCruiseServiceDto,
  ) {
    return await this.servicesService.createCruiseService(
      createCruiseServiceDto,
    );
  }

  @ApiTags('Cruises')
  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch('cruises/:id')
  async updateCruiseService(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true }))
    updateCruiseServiceDto: UpdateCruiseServiceDto,
  ) {
    return await this.servicesService.updateCruiseService(
      id,
      updateCruiseServiceDto,
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get()
  findAll(@Query() query: QueryServiceDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return this.servicesService.findAll({
      page,
      limit,
    });
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
