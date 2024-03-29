import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../../../domain/user';
import { WholesalerEntity } from 'src/modules/wholesalers/entities/wholesaler.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper implements User {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  // @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @Column({ nullable: true })
  wholesalerId?: WholesalerEntity['id'];
  @ManyToOne(() => WholesalerEntity, (wholesaler) => wholesaler.users)
  wholesaler?: WholesalerEntity;

  @Column({ nullable: true })
  travelOfficeId?: TravelOfficeEntity['id'];
  @ManyToOne(() => TravelOfficeEntity, (travelOffice) => travelOffice.users)
  travelOffice?: TravelOfficeEntity;

  @Column({ nullable: true })
  profilePhotoId?: GalleryEntity['id'];
  @OneToOne(() => GalleryEntity, (gallery) => gallery.user, { cascade: true })
  @JoinColumn({ name: 'profilePhotoId' })
  profilePhoto?: GalleryEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.user)
  reservations: ReservationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
