import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HotelEntity } from './hotel.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column({ type: String, nullable: true })
  @IsString()
  description: string;

  @Column({ type: 'float', nullable: true })
  @IsPositive()
  price: number;

  @Column({ type: 'float', nullable: true })
  @IsPositive()
  savings: number;

  @Column({ type: Number })
  @IsPositive()
  availableRooms: number;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.rooms)
  hotel: HotelEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
