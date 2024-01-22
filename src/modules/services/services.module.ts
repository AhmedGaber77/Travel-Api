import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { WholesalersModule } from '../wholesalers/wholesalers.module';
import { HotelsModule } from '../hotels/hotels.module';
import { RoomEntity } from '../hotels/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceEntity, RoomEntity]),
    WholesalersModule,
    HotelsModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
