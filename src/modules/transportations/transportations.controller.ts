import { Controller, Get, Param } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transportations')
@Controller({ path: 'services/transportations', version: '1' })
export class TransportationsController {
  constructor(
    private readonly transportationsService: TransportationsService,
  ) {}

  // @Get()
  // findAll() {
  //   return this.transportationsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportationsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransportationDto: UpdateTransportationDto,
  // ) {
  //   return this.transportationsService.update(+id, updateTransportationDto);
  // }
}
