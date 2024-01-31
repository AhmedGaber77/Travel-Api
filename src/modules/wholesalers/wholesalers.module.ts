import { Module } from '@nestjs/common';
import { WholesalersService } from './wholesalers.service';
import { WholesalersController } from './wholesalers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WholesalerEntity } from './entities/wholesaler.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WholesalerEntity, UserEntity])],
  controllers: [WholesalersController],
  providers: [WholesalersService],
  exports: [WholesalersService],
})
export class WholesalersModule {}
