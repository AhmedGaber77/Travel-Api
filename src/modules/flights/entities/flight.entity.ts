import { IsString } from 'class-validator';
import { CityEntity } from 'src/modules/cities/entities/city.entity';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeatEntity } from './seat.entity';

@Entity('flight')
export class FlightEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @IsString()
  airline: string;

  @Column({ type: String })
  @IsString()
  departureLocation: string;

  @Column({ type: String })
  @IsString()
  arrivalLocation: string;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @ManyToOne(() => CityEntity, (city) => city.departureFlights)
  departureCity: CityEntity;

  @ManyToOne(() => CityEntity, (city) => city.arrivalFlights)
  arrivalCity: CityEntity;

  @OneToOne(() => ServiceEntity, (service) => service.flight)
  service: ServiceEntity;

  @OneToMany(() => SeatEntity, (seat) => seat.flight)
  seats: SeatEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
