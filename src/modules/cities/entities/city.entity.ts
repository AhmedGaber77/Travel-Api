// Table City {
//   id SERIAL [pk, increment]
//   name VARCHAR(128)
//   postalCode VARCHAR(16)
//   countryId SERIAL [ref: > Country.id]
// }

import { CountryEntity } from 'src/modules/countries/entities/country.entity';
import { FlightEntity } from 'src/modules/flights/entities/flight.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('city')
export class CityEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  postalCode: string;

  @OneToOne(() => CountryEntity, (country) => country.cities)
  country: CountryEntity;

  @OneToMany(() => FlightEntity, (flight) => flight.departureCity)
  departureFlights: FlightEntity[];

  @OneToMany(() => FlightEntity, (flight) => flight.arrivalCity)
  arrivalFlights: FlightEntity[];
}
