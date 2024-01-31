import { Controller } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiTags } from '@nestjs/swagger';
import { PackageEntity } from './entities/package.entity';
import { Crud, CrudController } from '@dataui/crud';

// @ApiTags('Packages')
// @Controller({ path: 'packages', version: '1' })
// export class PackagesController {
//   constructor(private readonly packagesService: PackagesService) {}

//   @Post()
//   create(@Body() createPackageDto: CreatePackageDto) {
//     return this.packagesService.create(createPackageDto);
//   }

//   @Get()
//   findAll() {
//     return this.packagesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.packagesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
//     return this.packagesService.update(+id, updatePackageDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.packagesService.remove(+id);
//   }
// }

@Crud({
  model: { type: PackageEntity },
  dto: { create: CreatePackageDto, update: UpdatePackageDto },
  // params: {
  //   id: {
  //     field: 'id',
  //     type: 'number',
  //     primary: true,
  //   },
  // },
  query: {
    join: {
      wholesaler: {
        // allow: ['id', 'name'],
        // persist: ['packages'],
        // eager: true,
      },
    },
  },
})
@ApiTags('Packages')
@Controller({ path: 'packages', version: '1' })
export class PackagesController implements CrudController<PackageEntity> {
  constructor(public service: PackagesService) {}
}
