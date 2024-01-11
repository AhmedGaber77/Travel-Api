import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ type: String })
  @IsString()
  cancelationPolicy: string;
}
