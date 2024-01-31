import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'gallery' })
export class GalleryEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @Column()
  imageUrl: string;

  @ManyToOne(() => ServiceEntity, (service) => service.images)
  service: ServiceEntity;

  @OneToOne(
    () => TravelOfficeEntity,
    (travelOffice) => travelOffice.profilePhoto,
  )
  travelOffice: any;
}
