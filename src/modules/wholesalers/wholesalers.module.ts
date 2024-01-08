import { Module } from '@nestjs/common';
import { WholesalersService } from './wholesalers.service';
import { WholesalersController } from './wholesalers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WholesalerEntity } from './entities/wholesaler.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WholesalerEntity])],
  controllers: [WholesalersController],
  providers: [WholesalersService],
})
export class WholesalersModule {}
