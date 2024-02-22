import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';

export class CreateTransactionDto {
  @ApiProperty({
    type: () => String,
    enum: TransactionType,
  })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    type: () => Number,
  })
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  transactionDate: Date;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  transactionTime: Date;

  @ApiPropertyOptional({
    type: () => String,
  })
  description?: string;

  @ApiProperty({
    type: () => ReservationEntity,
  })
  @IsOptional()
  reservation?: ReservationEntity;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  currency: string;
}
