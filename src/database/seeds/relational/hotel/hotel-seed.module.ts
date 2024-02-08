import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from 'src/modules/hotels/entities/hotel.entity';
import { HotelSeedService } from './hotel-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity])],
  providers: [HotelSeedService],
  exports: [HotelSeedService],
})
export class HotelSeedModule {}
