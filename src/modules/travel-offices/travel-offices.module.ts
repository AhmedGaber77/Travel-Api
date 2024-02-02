import { Module } from '@nestjs/common';
import { TravelOfficesService } from './travel-offices.service';
import { TravelOfficesController } from './travel-offices.controller';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WholesalerEntity } from '../wholesalers/entities/wholesaler.entity';
import { WholesalersModule } from '../wholesalers/wholesalers.module';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { AccountEntity } from '../accounts/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TravelOfficeEntity,
      WholesalerEntity,
      UserEntity,
      GalleryEntity,
      AccountEntity,
    ]),
    WholesalersModule,
  ],
  controllers: [TravelOfficesController],
  providers: [TravelOfficesService],
})
export class TravelOfficesModule {}
