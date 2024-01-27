import { Module } from '@nestjs/common';
import { CruisesService } from './cruises.service';
import { CruisesController } from './cruises.controller';
import { CruiseEntity } from './entities/cruise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CruiseEntity])],
  controllers: [CruisesController],
  providers: [CruisesService],
})
export class CruisesModule {}
