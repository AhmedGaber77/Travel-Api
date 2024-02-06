import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { ServicesModule } from '../services/services.module';
import { HotelRoomEntity } from '../hotel-rooms/entities/hotel-room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, HotelRoomEntity]),
    ServicesModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService],
})
export class HotelsModule {}
