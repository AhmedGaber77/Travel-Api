import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';

@Entity({ name: 'hotel' })
export class HotelEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    type: () => String,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  address: string;

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
  state: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  zipCode: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  mobileNumber: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  website?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @Column({ nullable: true })
  email: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => RoomEntity, (room) => room.hotel)
  rooms: RoomEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
