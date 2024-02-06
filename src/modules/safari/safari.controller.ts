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
  ValidationPipe,
} from '@nestjs/common';
import { SafariService } from './safari.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSafariServiceDto } from './dto/create-safari.dto';
import { UpdateSafariServiceDto } from './dto/update-safari.dto';

@ApiTags('Safaris')
@Controller({ path: 'safari', version: '1' })
export class SafariController {
  constructor(private readonly safariService: SafariService) {}

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

  @ApiOperation({ summary: 'Find all Safari services' })
  @ApiResponse({ status: 200, description: 'List of all Safari services' })
  @Get()
  findAllSafariServices() {
    return this.safariService.findAllSafariServices();
  }

  @ApiOperation({ summary: 'Find one Safari service' })
  @ApiResponse({
    status: 200,
    description: 'The found Safari service',
  })
  @Get(':id')
  findOneSafariService(@Param('id') id: string) {
    return this.safariService.findOneSafariService(+id);
  }

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
