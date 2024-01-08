import { Module } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { TransportationsController } from './transportations.controller';

@Module({
  controllers: [TransportationsController],
  providers: [TransportationsService],
})
export class TransportationsModule {}
