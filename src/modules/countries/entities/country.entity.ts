import { CityEntity } from 'src/modules/cities/entities/city.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class CountryEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @OneToMany(() => CityEntity, (city) => city.country)
  cities: CityEntity[];
}
