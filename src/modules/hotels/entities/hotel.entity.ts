import {
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'hotel' })
export class HotelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: String })
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column({ type: String })
  @IsString()
  city: string;

  @Column({ type: String })
  @IsString()
  state: string;

  @IsString()
  @IsPostalCode()
  zipCode: string;

  @IsString()
  // @IsMobilePhone()
  phoneNumber: string;

  @IsString()
  website: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  hotelDescription: string;

  @OneToOne(() => ServiceEntity, (service) => service.hotel)
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
