import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ServicesModule } from '../services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { ServiceEntity } from '../services/entities/service.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { TravelerEntity } from './entities/traveler.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { PdfEntity } from 'src/pdf-upload/entities/pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationEntity,
      ServiceEntity,
      UserEntity,
      TravelerEntity,
      PdfEntity,
    ]),
    ServicesModule,
    AccountsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
