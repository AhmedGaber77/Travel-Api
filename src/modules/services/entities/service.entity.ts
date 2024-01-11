import { IsString } from 'class-validator';
import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'service' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, length: 50, unique: true })
  @Unique('unique_name', ['name'])
  @IsString()
  name: string;

  @Column({ type: String, nullable: true })
  @IsString()
  description: string;

  @Column({ type: 'float', nullable: true })
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

  @ManyToOne(() => PackageEntity, (packageEntity) => packageEntity.services)
  package: PackageEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
