import { IsString } from 'class-validator';
import { FlightEntity } from 'src/modules/flights/entities/flight.entity';
import { RoomEntity } from 'src/modules/hotels/entities/room.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ServiceType {
  Flight = 'flight-seats',
  HotelRooms = 'hotel-rooms',
  Transportation = 'transportation',
  Safari = 'safari',
  Cruise = 'cruise',
}

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, length: 50, unique: true })
  @IsString()
  name: string;

  @Index()
  @Column({ type: 'enum', enum: ServiceType })
  @IsString()
  type: string;

  @Column({ type: String })
  @IsString()
  description: string;

  @Column({ type: 'float' })
  @IsString()
  price: number;

  @Column({ type: 'float', nullable: true })
  @IsString()
  savings: number;

  @Column({ type: Boolean, nullable: true, default: false })
  @IsString()
  isOffer: boolean;

  @Column({ type: String })
  @IsString()
  destination: string;

  @Column({ type: String, nullable: true })
  @IsString()
  cancelationPolicy: string;

  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.services)
  wholesaler: WholesalerEntity;

  @ManyToMany(() => PackageEntity, (packageEntity) => packageEntity.services)
  packages: PackageEntity[];

  // @OneToOne(() => HotelEntity, (hotel) => hotel.service)
  // @JoinColumn()
  // hotel: HotelEntity;

  @OneToOne(() => RoomEntity, (room) => room.service)
  @JoinColumn()
  room: RoomEntity;

  @OneToOne(() => FlightEntity, (flight) => flight.service)
  @JoinColumn()
  flight: FlightEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
