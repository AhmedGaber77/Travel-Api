import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CruiseEntity } from 'src/modules/cruises/entities/cruise.entity';
import { FlightEntity } from 'src/modules/flights/entities/flight.entity';
import { RoomEntity } from 'src/modules/hotels/entities/room.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { SafariEntity } from 'src/modules/safari/entities/safari.entity';
import { TransportationEntity } from 'src/modules/transportations/entities/transportation.entity';
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

  // @Column({ type: String, nullable: true })
  // @IsString()
  // cancelationPolicy: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  cancellationPolicy: string;

  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.services)
  wholesaler: WholesalerEntity;

  @ManyToMany(() => PackageEntity, (packageEntity) => packageEntity.services)
  packages: PackageEntity[];

  @OneToOne(() => RoomEntity, (room) => room.service, { cascade: true })
  @JoinColumn()
  room: RoomEntity;

  @OneToOne(() => FlightEntity, (flight) => flight.service, { cascade: true })
  @JoinColumn()
  flight: FlightEntity;

  @OneToOne(
    () => TransportationEntity,
    (transportation) => transportation.service,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  transportation: TransportationEntity;

  @OneToOne(() => SafariEntity, (safari) => safari.service, { cascade: true })
  @JoinColumn()
  safari: SafariEntity;

  @OneToOne(() => CruiseEntity, (cruise) => cruise.service, { cascade: true })
  @JoinColumn()
  cruise: CruiseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
