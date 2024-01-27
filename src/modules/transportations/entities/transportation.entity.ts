import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transportation' })
export class TransportationEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  type: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  departureAddress?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  arrivalAddress?: string;

  @ApiPropertyOptional({
    type: () => Date,
  })
  @Column({ nullable: true })
  departureTime?: Date;

  @ApiPropertyOptional({
    type: () => Date,
  })
  @Column({ nullable: true })
  arrivalTime?: Date;

  @ApiPropertyOptional({
    type: () => Date,
  })
  departingDate?: Date;

  @ApiPropertyOptional({
    type: () => Date,
  })
  returningDate?: Date;

  @OneToOne(() => ServiceEntity, (service) => service.transportation)
  service: ServiceEntity;
}
