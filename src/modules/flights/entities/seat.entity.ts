import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlightEntity } from './flight.entity';

@Entity('seat')
export class SeatEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  type: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: Number })
  quantity: number;

  @ManyToOne(() => FlightEntity, (flight) => flight.seats)
  flight: FlightEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
