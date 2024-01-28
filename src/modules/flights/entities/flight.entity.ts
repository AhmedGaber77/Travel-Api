import { IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('flight')
export class FlightEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  airline: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  departureAddress: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  arrivalAddress: string;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  departureTime: Date;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  arrivalTime: Date;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  seatType: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  availableSeats: number;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  departureCity: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  arrivalCity: string;

  // @OneToOne(() => ServiceEntity, (service) => service.flight)
  @Column(() => ServiceEntity)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
