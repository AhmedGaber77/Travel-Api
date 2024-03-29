import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationEntity } from './reservation.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PdfEntity } from 'src/pdf-upload/entities/pdf.entity';

@Entity({ name: 'traveler' })
export class TravelerEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.travelers)
  reservation: ReservationEntity;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  firstName: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  lastName: string;

  @ApiPropertyOptional({
    type: () => String,
  })
  @IsEmail()
  @Column({ nullable: true })
  email?: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  @Column()
  mobilePhone: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @OneToMany(() => PdfEntity, (pdf) => pdf.traveler, {
    cascade: true,
    eager: true,
  })
  files: PdfEntity[];
}
