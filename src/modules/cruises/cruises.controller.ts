import { Controller, Get, Param } from '@nestjs/common';
import { CruisesService } from './cruises.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cruises')
@Controller({ path: 'services/cruises', version: '1' })
export class CruisesController {
  constructor(private readonly cruisesService: CruisesService) {}

  // @Get()
  // findAll() {
  //   return this.cruisesService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cruisesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCruiseDto: UpdateCruiseDto) {
  //   return this.cruisesService.update(+id, updateCruiseDto);
  // }
}
