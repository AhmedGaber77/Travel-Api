import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightEntity, ServiceEntity, GalleryEntity]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
