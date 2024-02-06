import { Module } from '@nestjs/common';
import { CruisesService } from './cruises.service';
import { CruisesController } from './cruises.controller';
import { CruiseEntity } from './entities/cruise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CruiseEntity, ServiceEntity, GalleryEntity]),
  ],
  controllers: [CruisesController],
  providers: [CruisesService],
})
export class CruisesModule {}
