import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HotelEntity } from './hotel.entity';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity('room')
export class RoomEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column({ type: Number })
  @IsPositive()
  roomArea: number;

  @Column({ type: Number })
  @IsPositive()
  numberOfBeds: number;

  @Column({ type: Number })
  @IsPositive()
  numberOfSleeps: number;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.rooms, { eager: true })
  hotel: HotelEntity;

  @OneToOne(() => ServiceEntity, (service) => service.room)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
