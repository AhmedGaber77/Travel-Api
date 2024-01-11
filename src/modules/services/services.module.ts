import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, WholesalerEntity])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
