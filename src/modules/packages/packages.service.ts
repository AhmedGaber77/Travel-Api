import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { Repository } from 'typeorm';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';
import { CrudService } from '@nestjs-library/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

// @Injectable()
// export class PackagesService {
//   constructor(
//     @InjectRepository(PackageEntity)
//     private readonly packageRepository: Repository<PackageEntity>,
//     @InjectRepository(WholesalerEntity)
//     private wholesalerRepository: Repository<WholesalerEntity>,
//   ) {}
//   async create(createPackageDto: CreatePackageDto) {
//     const wholesaler = await this.wholesalerRepository.findOne({
//       where: { id: createPackageDto.WholesalerId },
//     });
//     if (!wholesaler) {
//       throw new NotFoundException(
//         `Wholesaler #${createPackageDto.WholesalerId} not found`,
//       );
//     }
//     const packageObject = this.packageRepository.create(createPackageDto);
//     return this.packageRepository.save(packageObject);
//   }

//   findAll() {
//     return this.packageRepository.find();
//   }

//   async findOne(id: number) {
//     const packageObject = await this.packageRepository.findOne({
//       where: { id },
//     });
//     if (!packageObject) {
//       throw new NotFoundException(`package with id ${id} not found`);
//     }
//     return packageObject;
//   }

//   async update(id: number, updatePackageDto: UpdatePackageDto) {
//     const ExistingPackage = await this.packageRepository.findOne({
//       where: { id },
//     });
//     if (!ExistingPackage) {
//       throw new NotFoundException(`Package with id ${id} not found`);
//     }
//     await this.packageRepository.update(id, updatePackageDto);
//     return this.packageRepository.findOne({ where: { id } });
//   }

//   async remove(id: number) {
//     const result = await this.packageRepository.update(id, {
//       deletedAt: new Date(),
//     });

//     if (result.affected === 0) {
//       throw new NotFoundException(`Package with id ${id} not found`);
//     }
//   }
// }

@Injectable()
export class PackagesService extends TypeOrmCrudService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repository: Repository<PackageEntity>,
  ) {
    super(repository);
  }
}
