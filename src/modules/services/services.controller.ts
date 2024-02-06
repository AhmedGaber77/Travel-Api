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
  UpdateServiceDto,
  UpdateStandardPackageServiceDto,
} from './dto/update-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
