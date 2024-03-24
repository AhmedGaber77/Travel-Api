import { PackageEntity } from 'src/modules/packages/entities/package.entity';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { User } from 'src/users/domain/user';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'wholesaler' })
export class WholesalerEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Index()
  @Column({
    type: String,
    unique: true,
  })
  email: string | null;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  mobilePhone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  postalCode?: string;

  @OneToMany(() => UserEntity, (user) => user.wholesaler, { cascade: true })
  users: User[];

  @OneToMany(
    () => TravelOfficeEntity,
    (travelOffice) => travelOffice.wholesaler,
  )
  travelOffices: TravelOfficeEntity[];

  @OneToMany(() => PackageEntity, (packageEntity) => packageEntity.wholesaler)
  packages: PackageEntity[];

  @OneToMany(() => ServiceEntity, (serviceEntity) => serviceEntity.wholesaler)
  services: ServiceEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
