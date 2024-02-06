import { Module } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoomEntity } from './entities/hotel-room.entity';
import { HotelsModule } from '../hotels/hotels.module';
import { ServicesModule } from '../services/services.module';
import { HotelEntity } from '../hotels/entities/hotel.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HotelRoomEntity,
      HotelEntity,
      ServiceEntity,
      GalleryEntity,
    ]),
    HotelsModule,
    ServicesModule,
  ],
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
  exports: [HotelRoomsService],
})
export class HotelRoomsModule {}
