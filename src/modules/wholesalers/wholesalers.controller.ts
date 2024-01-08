import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { WholesalersService } from './wholesalers.service';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wholesalers')
@Controller({
  path: 'wholesalers',
  version: '1',
})
export class WholesalersController {
  constructor(private readonly wholesalersService: WholesalersService) {}

  @Post()
  create(@Body() createWholesalerDto: CreateWholesalerDto) {
    return this.wholesalersService.create(createWholesalerDto);
  }

  @Get()
  findAll() {
    return this.wholesalersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholesalersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWholesalerDto: UpdateWholesalerDto,
  ) {
    return this.wholesalersService.update(+id, updateWholesalerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.wholesalersService.remove(+id);
  }
}
