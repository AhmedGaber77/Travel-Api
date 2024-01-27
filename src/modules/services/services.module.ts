import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { WholesalersModule } from '../wholesalers/wholesalers.module';
import { HotelsModule } from '../hotels/hotels.module';
import { RoomEntity } from '../hotels/entities/room.entity';
import { FlightEntity } from '../flights/entities/flight.entity';
import { TransportationEntity } from '../transportations/entities/transportation.entity';
import { SafariEntity } from '../safari/entities/safari.entity';
import { CruiseEntity } from '../cruises/entities/cruise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      RoomEntity,
      FlightEntity,
      TransportationEntity,
      SafariEntity,
      CruiseEntity,
    ]),
    WholesalersModule,
    HotelsModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
