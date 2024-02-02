import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { CruiseEntity } from 'src/modules/cruises/entities/cruise.entity';
import { FlightEntity } from 'src/modules/flights/entities/flight.entity';
import { RoomEntity } from 'src/modules/hotels/entities/room.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
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
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum ServiceType {
  FlightSeats = 'flight-seats',
  HotelRooms = 'hotel-rooms',
  Transportation = 'transportation',
  Safari = 'safari',
  Cruise = 'cruise',
}

@Entity({ name: 'service' })
@Unique(['name'])
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  // @ApiProperty({
  //   type: 'enum',
  // })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  @Column({ enum: ServiceType })
  type: ServiceType;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Min(10)
  @Column()
  description: string;

  @ApiProperty({
    type: () => Number,
  })
  @IsNotEmpty()
  @Column({ type: 'float' })
  price: number;

  @ApiProperty({
    type: () => Number,
  })
  @IsNotEmpty()
  @IsPositive()
  @Column()
  quantityAvailable: number;

  @ApiPropertyOptional({
    type: () => Number,
  })
  @Column({ type: 'float', nullable: true })
  savings?: number;

  @ApiProperty({
    type: () => Boolean,
  })
  @Column({ nullable: true, default: false })
  @IsString()
  isOffer: boolean = false;

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

  @OneToMany(() => GalleryEntity, (gallery) => gallery.service, {
    cascade: true,
  })
  @JoinColumn()
  images: GalleryEntity[];

  @OneToMany(() => ReservationEntity, (reservation) => reservation.service)
  reservations: ReservationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
