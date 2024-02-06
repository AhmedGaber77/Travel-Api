import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { HotelRoomEntity } from '../hotel-rooms/entities/hotel-room.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, HotelRoomEntity, GalleryEntity]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
