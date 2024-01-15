import { Module } from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { TravelOfficesController } from './travel-offices.controller';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';
import { WholesalersModule } from '../wholesalers/wholesalers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelOfficeEntity, WholesalerEntity]),
    WholesalersModule,
  ],
  controllers: [TravelOfficesController],
  providers: [TravelOfficesService],
})
export class TravelOfficesModule {}
