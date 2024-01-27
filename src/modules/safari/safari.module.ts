import { Module } from '@nestjs/common';
import { SafariService } from './safari.service';
import { SafariController } from './safari.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SafariEntity } from './entities/safari.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SafariEntity])],
  controllers: [SafariController],
  providers: [SafariService],
})
export class SafariModule {}
