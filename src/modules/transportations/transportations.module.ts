import { Module } from '@nestjs/common';
import { TransportationsService } from './transportations.service';
import { TransportationsController } from './transportations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportationEntity } from './entities/transportation.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransportationEntity,
      ServiceEntity,
      GalleryEntity,
    ]),
  ],
  controllers: [TransportationsController],
  providers: [TransportationsService],
})
export class TransportationsModule {}
