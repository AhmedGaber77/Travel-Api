import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '../entities/reservation.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateReservationStatusDto {
  @ApiProperty({
    type: () => String,
    enum: ReservationStatus,
  })
  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
