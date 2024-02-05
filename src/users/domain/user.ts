import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/files/domain/file';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/statuses/domain/status';

export class User {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;
  profilePhotoId?: GalleryEntity['id'] | null;
  profilePhoto?: GalleryEntity | null;
  role?: Role | null;
  travelOfficeId?: TravelOfficeEntity['id'] | null;
  travelOffice?: TravelOfficeEntity | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
