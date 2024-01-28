import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gallery' })
export class GalleryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => ServiceEntity, (service) => service.images)
  service: ServiceEntity;
}
