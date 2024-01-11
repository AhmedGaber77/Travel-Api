import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity, WholesalerEntity])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
