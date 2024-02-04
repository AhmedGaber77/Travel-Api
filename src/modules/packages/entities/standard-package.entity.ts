import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ServiceEntity } from 'src/modules/services/entities/service.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PackageDayEntity } from './package-day.entity';

@Entity({ name: 'standard_package' })
export class StandardPackageEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  included: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  excluded: string;

  @ApiProperty({
    type: () => String,
  })
  @IsNotEmpty()
  @IsString()
  tourType: string;

  // @ApiProperty({
  //   type: () => Number,
  // })
  // @Column({ type: Number })
  // serviceId: ServiceEntity['id'];
  @OneToOne(() => ServiceEntity, (service) => service.standardPackage)
  service: ServiceEntity;

  @OneToMany(
    () => PackageDayEntity,
    (packageDay) => packageDay.standardPackage,
    { eager: true, cascade: true },
  )
  packageDays: PackageDayEntity[];
}
