import { Module } from '@nestjs/common';
import { WholesalersService } from './wholesalers.service';
import { WholesalersController } from './wholesalers.controller';

@Module({
  controllers: [WholesalersController],
  providers: [WholesalersService],
})
export class WholesalersModule {}
