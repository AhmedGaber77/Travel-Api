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
import { SafariService } from './safari.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSafariServiceDto } from './dto/create-safari.dto';
import { UpdateSafariServiceDto } from './dto/update-safari.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Safaris')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'safari', version: '1' })
export class SafariController {
  constructor(private readonly safariService: SafariService) {}

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Create a new Safari service' })
  @ApiBody({ type: CreateSafariServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The Safari service has been successfully created.',
  })
  @Post()
  createSafariService(
    @Body(new ValidationPipe({ transform: true }))
    createSafariServiceDto: CreateSafariServiceDto,
  ) {
    return this.safariService.createSafariService(createSafariServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find all Safari services' })
  @ApiResponse({ status: 200, description: 'List of all Safari services' })
  @Get()
  findAllSafariServices() {
    return this.safariService.findAllSafariServices();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler, RoleEnum.travelAgent)
  @ApiOperation({ summary: 'Find one Safari service' })
  @ApiResponse({
    status: 200,
    description: 'The found Safari service',
  })
  @Get(':id')
  findOneSafariService(@Param('id') id: string) {
    return this.safariService.findOneSafariService(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Update a Safari service' })
  @ApiResponse({
    status: 200,
    description: 'The updated Safari service',
  })
  @Patch(':id')
  updateSafariService(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSafariServiceDto: UpdateSafariServiceDto,
  ) {
    return this.safariService.updateSafariService(+id, updateSafariServiceDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @ApiOperation({ summary: 'Soft delete a Safari service' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The Safari service has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  softDeleteSafariService(@Param('id') id: string) {
    return this.safariService.softDeleteSafariService(+id);
  }
}
