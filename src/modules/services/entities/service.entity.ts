import { IsString } from 'class-validator';
import { HotelEntity } from 'src/modules/hotels/entities/hotel.entity';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum ServiceType {
  Flight = 'flight',
  Hotel = 'hotel',
  Transportation = 'transportation',
}

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, length: 50, unique: true })
  @Unique('unique_name', ['name'])
  @IsString()
  name: string;

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

  @OneToOne(() => HotelEntity, (hotel) => hotel.service)
  @JoinColumn()
  hotel: HotelEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
