import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { WholesalersModule } from '../wholesalers/wholesalers.module';
import { FlightEntity } from '../flights/entities/flight.entity';
import { TransportationEntity } from '../transportations/entities/transportation.entity';
import { SafariEntity } from '../safari/entities/safari.entity';
import { CruiseEntity } from '../cruises/entities/cruise.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { StandardPackageEntity } from '../packages/entities/standard-package.entity';
import { PackageDayEntity } from '../packages/entities/package-day.entity';
import { HotelRoomEntity } from '../hotel-rooms/entities/hotel-room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      HotelRoomEntity,
      FlightEntity,
      TransportationEntity,
      SafariEntity,
      CruiseEntity,
      GalleryEntity,
      StandardPackageEntity,
      PackageDayEntity,
    ]),
    WholesalersModule,
    // HotelsModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
