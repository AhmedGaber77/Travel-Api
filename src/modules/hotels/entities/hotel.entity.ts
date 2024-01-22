import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';

@Entity({ name: 'hotel' })
export class HotelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: String })
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column({ type: String })
  @IsString()
  city: string;

  @Column({ type: String })
  @IsString()
  state: string;

  @IsString()
  // @IsPostalCode()
  zipCode: string;

  @IsString()
  // @IsMobilePhone()
  phoneNumber: string;

  @IsString()
  website: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  hotelDescription: string;

  // @OneToOne(() => ServiceEntity, (service) => service.hotel)
  // service: ServiceEntity;

  @OneToMany(() => RoomEntity, (room) => room.hotel)
  rooms: RoomEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
