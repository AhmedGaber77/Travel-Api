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
import { HotelEntity } from '../../hotels/entities/hotel.entity';
import { ServiceEntity } from '../../services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';

@Entity('room')
export class HotelRoomEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  type: string;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @Column()
  roomArea: number;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @Column()
  numberOfBeds: number;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @Column()
  numberOfSleeps: number;

  @ApiProperty({
    type: () => Number,
  })
  @Column()
  hotelId: HotelEntity['id'];
  @ManyToOne(() => HotelEntity, (hotel) => hotel.rooms)
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
