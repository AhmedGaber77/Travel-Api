import { Module } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { TransportationsController } from './transportations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportationEntity } from './entities/transportation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportationEntity])],
  controllers: [TransportationsController],
  providers: [TransportationsService],
})
export class TransportationsModule {}
