import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cruise')
export class CruiseEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  depratureCity: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  depratureCountry: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  depratureAddress: string;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  depratureTime: Date;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  endTime: Date;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  cabinType: string;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @IsNotEmpty()
  @Column()
  availableSeats: number;

  @OneToOne(() => ServiceEntity, (service) => service.cruise)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
