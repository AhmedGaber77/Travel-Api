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
  UseGuards,
} from '@nestjs/common';
import { WholesalersService } from './wholesalers.service';
import { CreateWholesalerDto } from './dto/create-wholesaler.dto';
import { UpdateWholesalerDto } from './dto/update-wholesaler.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddUserToWholesalerDto } from './dto/add-user-wholesaler.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Wholesalers')
@Controller({
  path: 'wholesalers',
  version: '1',
})
export class WholesalersController {
  constructor(private readonly wholesalersService: WholesalersService) {}

  @Roles(RoleEnum.admin)
  @Post()
  create(@Body() createWholesalerDto: CreateWholesalerDto) {
    return this.wholesalersService.create(createWholesalerDto);
  }

  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.wholesalersService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholesalersService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWholesalerDto: UpdateWholesalerDto,
  ) {
    return this.wholesalersService.update(+id, updateWholesalerDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.wholesalersService.remove(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.wholesaler)
  @Get(':wholesalerId/users')
  findUsersByWholesalerId(@Param('wholesalerId') wholesalerId: string) {
    return this.wholesalersService.findUsersByWholesalerId(+wholesalerId);
  }

  @Roles(RoleEnum.admin)
  @Post(':wholesalerId/users')
  assignUserToWholesaler(
    @Param('wholesalerId') wholesalerId: string,
    @Body() addUserToWholesaler: AddUserToWholesalerDto,
  ) {
    return this.wholesalersService.addUserToWholesaler(
      +wholesalerId,
      addUserToWholesaler.userId,
    );
  }
}
