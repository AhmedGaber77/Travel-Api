import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'account' })
export class AccountEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Number })
  @IsNotEmpty()
  @Column({ default: 0 })
  currentBalance: number;

  @OneToOne(() => TravelOfficeEntity, (travelOffice) => travelOffice.account)
  travelOffice: TravelOfficeEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];
}
