import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { ServicesModule } from '../services/services.module';
import { SeatEntity } from './entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlightEntity, SeatEntity]),
    ServicesModule,
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
