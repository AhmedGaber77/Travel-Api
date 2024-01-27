import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { SafariService } from './safari.service';
import { UpdateSafariDto } from './dto/update-safari.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Safari')
@Controller({ path: 'safari', version: '1' })
export class SafariController {
  constructor(private readonly safariService: SafariService) {}

  @Get()
  findAll() {
    return this.safariService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.safariService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSafariDto: UpdateSafariDto) {
    return this.safariService.update(+id, updateSafariDto);
  }
}