import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

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

  @OneToMany(() => UserEntity, (user) => user.travelOffice)
  @JoinColumn()
  users: UserEntity[];

  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.travelOffices)
  wholesaler: WholesalerEntity;

  @OneToOne(() => GalleryEntity, (gallery) => gallery.travelOffice)
  @JoinColumn()
  profilePhoto?: GalleryEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.travelOffice)
  reservations: ReservationEntity[];

  @OneToOne(() => AccountEntity, (account) => account.travelOffice, {
    cascade: true,
  })
  @JoinColumn()
  account: AccountEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
