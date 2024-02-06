import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { HotelRoomEntity } from 'src/modules/hotel-rooms/entities/hotel-room.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';

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
  @IsOptional()
  @Column({ nullable: true })
  zipCode?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  mobileNumber?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  website?: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => HotelRoomEntity, (room) => room.hotel, {
    onDelete: 'RESTRICT',
  })
  rooms: HotelRoomEntity[];

  @OneToMany(() => GalleryEntity, (gallery) => gallery.hotel, {
    cascade: true,
  })
  images: GalleryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
