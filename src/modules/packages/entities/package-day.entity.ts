import { ApiProperty } from '@nestjs/swagger';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StandardPackageEntity } from './standard-package.entity';

@Entity({ name: 'package_day' })
export class PackageDayEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => String,
  })
  @Column()
  dayName: string;

  @ApiProperty({
    type: () => String,
  })
  @Column()
  dayDescription: string;

  @ManyToOne(
    () => StandardPackageEntity,
    (standardPackage) => standardPackage.packageDays,
  )
  standardPackage: StandardPackageEntity;
}
