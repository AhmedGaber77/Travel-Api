import { TravelerEntity } from 'src/modules/reservations/entities/traveler.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'pdf' })
export class PdfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => TravelerEntity, (pdf) => pdf.files)
  traveler: TravelerEntity;
}
