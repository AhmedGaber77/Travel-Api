import { IsJSON, IsPostalCode } from 'class-validator';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'travel_office',
})
export class TravelOfficeEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('json')
  @IsJSON()
  contactInfo: any;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String, unique: true })
  phone: string;

  @Column({ type: String, nullable: true })
  address: string;

  @Column({ type: String, nullable: true })
  city: string;

  @Column({ type: String, nullable: true })
  state: string;

  @Column({ type: String, nullable: true })
  country: string;

  @Column({ type: String, nullable: true })
  @IsPostalCode()
  postalCode: string;

  @OneToMany(() => UserEntity, (user) => user.travelOffice)
  users: UserEntity[];

  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.travelOffices)
  wholesaler: WholesalerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
