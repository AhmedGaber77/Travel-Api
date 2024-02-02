import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
}

@Entity({ name: 'reservation' })
export class ReservationEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => Number,
  })
  @IsNotEmpty()
  @Column()
  quantity: number;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @Column('enum', {
    enum: ReservationStatus,
    default: ReservationStatus.Pending,
  })
  status: ReservationStatus;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  checkInDate: Date;

  @ApiPropertyOptional({
    type: () => Date,
  })
  @Column({ nullable: true })
  checkOutDate?: Date;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @IsOptional()
  @Column()
  CancelReason: string;

  // @Column()
  // serviceId: ServiceEntity['id'];
  @ManyToOne(() => ServiceEntity, (service) => service.reservations)
  @JoinColumn({ name: 'serviceId' })
  service: ServiceEntity;

  // @Column()
  // travelOfficeId: TravelOfficeEntity['id'];
  @ManyToOne(
    () => TravelOfficeEntity,
    (travelOffice) => travelOffice.reservations,
  )
  travelOffice: TravelOfficeEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
