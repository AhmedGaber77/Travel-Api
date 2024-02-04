import { Controller, Get, Param } from '@nestjs/common';
import { SafariService } from './safari.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Safaris')
@Controller({ path: 'services/safari', version: '1' })
export class SafariController {
  constructor(private readonly safariService: SafariService) {}

  // @Get()
  // findAll() {
  //   return this.safariService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.safariService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSafariDto: UpdateSafariDto) {
  //   return this.safariService.update(+id, updateSafariDto);
  // }
}
