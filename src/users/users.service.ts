import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateUserDto } from './dto/create-user.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { DeepPartial } from 'src/utils/types/deep-partial.type';
import { User } from './domain/user';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { RoleEnum } from 'src/roles/roles.enum';
import { FilesService } from 'src/files/files.service';
import bcrypt from 'bcryptjs';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { Repository } from 'typeorm';
import { TravelOfficeEntity } from 'src/modules/travel-offices/entities/travel-office.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
    @InjectRepository(TravelOfficeEntity)
    private readonly travelOfficeRepository: Repository<TravelOfficeEntity>,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const clonedPayload = {
      provider: AuthProvidersEnum.email,
      ...createProfileDto,
    };

    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });
      if (userObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'emailAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findOne({
        id: clonedPayload.photo.id,
      });
      if (!fileObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              photo: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.profilePhotoId) {
      const image = await this.galleryRepository.findOne({
        where: { id: clonedPayload.profilePhotoId },
      });
      if (!image) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              profilePhoto: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      clonedPayload.profilePhoto = image;
      clonedPayload.profilePhotoId = image.id;
    }
    if (clonedPayload.role?.id) {
      const roleObject = Object.values(RoleEnum).includes(
        clonedPayload.role.id,
      );
      if (!roleObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              role: 'roleNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      if (clonedPayload.role.id === RoleEnum.travelAgent) {
        if (!clonedPayload.travelOfficeId) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                travelOffice: 'travelOfficeNotExists',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        const travelOffice = await this.travelOfficeRepository.findOne({
          where: { id: clonedPayload.travelOfficeId },
        });
        if (!travelOffice) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                travelOffice: 'travelOfficeNotExists',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        clonedPayload.travelOffice = travelOffice;
      }
    }

    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum).includes(
        clonedPayload.status.id,
      );
      if (!statusObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              status: 'statusNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return this.usersRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne(fields);
  }

  async update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null> {
    const clonedPayload = { ...payload };

    if (
      clonedPayload.password &&
      clonedPayload.previousPassword !== clonedPayload.password
    ) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findOne({
        email: clonedPayload.email,
      });
      console.log(userObject);
      console.log(id);

      if (userObject?.id !== id) {
        console.log('here');
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              email: 'emailAlreadyExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findOne({
        id: clonedPayload.photo.id,
      });
      if (!fileObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              photo: 'imageNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.role?.id) {
      const roleObject = Object.values(RoleEnum).includes(
        clonedPayload.role.id,
      );
      if (!roleObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              role: 'roleNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum).includes(
        clonedPayload.status.id,
      );
      if (!statusObject) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              status: 'statusNotExists',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return this.usersRepository.update(id, clonedPayload);
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
