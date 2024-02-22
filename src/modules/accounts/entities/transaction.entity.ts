import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';

export enum TransactionType {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

@Entity({ name: 'transaction' })
export class TransactionEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @Column({ type: String, enum: TransactionType })
  type: TransactionType;

  @ManyToOne(() => AccountEntity, (account) => account.transactions, {
    cascade: true,
  })
  account: AccountEntity;

  @ApiProperty({
    type: () => Number,
  })
  @IsNotEmpty()
  @Column()
  amount: number;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  transactionDate: Date;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  transactionTime: Date;

  @ApiPropertyOptional({
    type: () => String,
  })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @Column()
  currency: string;

  @OneToOne(() => ReservationEntity, (reservation) => reservation.transaction)
  @JoinColumn()
  reservation?: ReservationEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
