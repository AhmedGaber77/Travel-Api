import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

@Entity('safari')
export class SafariEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  includes: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  excludes: string;

  @ApiProperty({
    type: () => Number,
  })
  @IsPositive()
  @IsNotEmpty()
  @Column()
  days: number;

  @ApiProperty({
    type: () => Date,
  })
  @IsNotEmpty()
  @Column()
  startTime: Date;

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
  city: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  country: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  address: string;

  @OneToOne(() => ServiceEntity, (service) => service.safari)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
