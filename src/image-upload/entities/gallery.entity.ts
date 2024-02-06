import { ApiProperty } from '@nestjs/swagger';
import { HotelEntity } from 'src/modules/hotels/entities/hotel.entity';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
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

  @ManyToOne(() => HotelEntity, (hotel) => hotel.images)
  hotel: HotelEntity;

  @OneToOne(
    () => TravelOfficeEntity,
    (travelOffice) => travelOffice.profilePhoto,
  )
  travelOffice: TravelOfficeEntity;

  @OneToOne(() => UserEntity, (user) => user.profilePhoto)
  user: UserEntity;
}
