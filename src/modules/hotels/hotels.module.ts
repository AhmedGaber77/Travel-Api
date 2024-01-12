import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from './entities/hotel.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { RoomsService } from './hotel-rooms.service';
import { ServicesModule } from '../services/services.module';
import { RoomEntity } from './entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, ServiceEntity, RoomEntity]),
    ServicesModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService, RoomsService],
  exports: [HotelsService, RoomsService],
})
export class HotelsModule {}
