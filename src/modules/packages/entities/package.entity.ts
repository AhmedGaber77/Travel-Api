import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
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

@Entity({ name: 'package' })
export class PackageEntity extends EntityRelationalHelper {
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
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({ type: 'float', nullable: true })
  @IsNumber()
  @IsPositive()
  savings: number;

  @Column({ type: Boolean, nullable: true, default: false })
  @IsBoolean()
  isOffer: boolean;

  @Column({ type: String })
  @IsString()
  destination: string;

  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.packages)
  wholesaler: WholesalerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
