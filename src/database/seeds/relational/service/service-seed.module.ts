import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceSeedService } from './service-seed.service';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceSeedService],
  exports: [ServiceSeedService],
})
export class ServiceSeedModule {}
