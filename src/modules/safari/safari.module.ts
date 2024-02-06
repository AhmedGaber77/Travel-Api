import { Module } from '@nestjs/common';
import { SafariService } from './safari.service';
import { SafariController } from './safari.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafariEntity } from './entities/safari.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SafariEntity, ServiceEntity, GalleryEntity]),
  ],
  controllers: [SafariController],
  providers: [SafariService],
})
export class SafariModule {}
