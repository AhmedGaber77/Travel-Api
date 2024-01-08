import { Module } from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { TravelOfficesController } from './travel-offices.controller';

@Module({
  controllers: [TravelOfficesController],
  providers: [TravelOfficesService],
})
export class TravelOfficesModule {}
