import { Module } from '@nestjs/common';
import { StandardPackagesService } from './standard-packages.service';
import { StandardPackagesController } from './standard-packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardPackageEntity } from './entities/standard-package.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { PackageDayEntity } from './entities/standard-package-day.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StandardPackageEntity,
      ServiceEntity,
      PackageDayEntity,
      GalleryEntity,
    ]),
  ],
  controllers: [StandardPackagesController],
  providers: [StandardPackagesService],
})
export class StandardPackagesModule {}
