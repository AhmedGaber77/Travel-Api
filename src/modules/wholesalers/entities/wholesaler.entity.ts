import { IsEmail, IsJSON, IsPostalCode } from 'class-validator';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'wholesaler' })
export class WholesalerEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('json')
  @IsJSON()
  contactInfo: any;

  @Column({ type: String, unique: true })
  @IsEmail()
  email: string | null;

  @Column({ type: String, unique: true })
  // @IsPhoneNumber()
  phone: string;

  @Column({ type: String, nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @OneToMany(() => UserEntity, (user) => user.wholesaler)
  users: UserEntity[];

  @Column({ length: 255, nullable: true })
  @IsPostalCode()
  postalCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
