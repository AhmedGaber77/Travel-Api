import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTravelOfficeDto } from './dto/create-travel-office.dto';
import { UpdateTravelOfficeDto } from './dto/update-travel-office.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelOfficeEntity } from './entities/travel-office.entity';
import { Repository } from 'typeorm';
import { WholesalersService } from '../wholesalers/wholesalers.service';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { GalleryEntity } from 'src/image-upload/entities/gallery.entity';
import { AccountEntity } from '../accounts/entities/account.entity';
import { RoleEnum } from 'src/roles/roles.enum';

@Injectable()
export class TravelOfficesService {
  constructor(
    @InjectRepository(TravelOfficeEntity)
    private travelOfficeRepository: Repository<TravelOfficeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(GalleryEntity)
    private galleryRepository: Repository<GalleryEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private wholesalerService: WholesalersService,
  ) {}
  async create(
    createTravelOfficeDto: CreateTravelOfficeDto,
  ): Promise<TravelOfficeEntity> {
    const wholesaler = await this.wholesalerService.findOne(
      createTravelOfficeDto.WholesalerId,
    );
    try {
      const travelOffice = this.travelOfficeRepository.create(
        createTravelOfficeDto,
      );
      travelOffice.wholesaler = wholesaler;
      if (createTravelOfficeDto.profilePhotoId) {
        const photo = await this.galleryRepository.findOne({
          where: { id: createTravelOfficeDto.profilePhotoId },
        });
        if (photo) {
          travelOffice.profilePhoto = photo;
        }
      }
      travelOffice.account = this.accountRepository.create();
      await this.travelOfficeRepository.save(travelOffice);
      return this.findOne(travelOffice.id);
    } catch (error) {
      throw new InternalServerErrorException('Error creating travel office');
    }
  }

  async findAll(): Promise<TravelOfficeEntity[]> {
    return this.travelOfficeRepository.find();
  }

  async findOne(id: number): Promise<TravelOfficeEntity> {
    const travelOffice = await this.travelOfficeRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
    if (!travelOffice) {
      throw new NotFoundException(`Travel office with id ${id} not found`);
    }
    return travelOffice;
  }

  async findOneByEmail(email: string): Promise<TravelOfficeEntity | undefined> {
    const travelOffice = await this.travelOfficeRepository.findOne({
      where: { email },
    });
    if (!travelOffice) {
      return;
    }
    return travelOffice;
  }

  async findUsersByTravelOfficeId(id: number): Promise<any> {
    const travelOffice = await this.findOne(id);
    return travelOffice.users;
  }

  async update(
    id: number,
    updateTravelOfficeDto: UpdateTravelOfficeDto,
  ): Promise<TravelOfficeEntity> {
    const travelOffice = await this.findOne(id);
    this.travelOfficeRepository.merge(travelOffice, updateTravelOfficeDto);
    return this.travelOfficeRepository.save(travelOffice);
  }

  async remove(id: number): Promise<boolean> {
    const travelOffice = await this.findOne(id);
    const result = await this.travelOfficeRepository.softDelete(
      travelOffice.id,
    );
    if (result.affected === 0) {
      return false;
    }
    return true;
  }

  async findWholesalerByTravelOfficeId(travelOfficeId: number) {
    const travelOffice = await this.findOne(travelOfficeId);
    const wholesaler = travelOffice.wholesaler;
    if (!wholesaler) {
      throw new NotFoundException(
        `No wholesaler assigned to travelOffice with id ${travelOfficeId}`,
      );
    }
    return wholesaler;
  }

  async assignWholesalerToTravelOffice(
    travelOfficeId: number,
    wholesalerId: number,
  ) {
    const travelOffice = await this.findOne(travelOfficeId);
    const wholesaler = await this.wholesalerService.findOne(wholesalerId);
    travelOffice.wholesaler = wholesaler;
    await this.travelOfficeRepository.save(travelOffice);
    return travelOffice;
  }

  async assignUserToTravelOffice(travelOfficeId: number, userId: number) {
    const travelOffice = await this.findOne(travelOfficeId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.wholesalerId !== null) {
      throw new HttpException(
        `User with id ${userId} is already assigned to a wholesaler`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      user.travelOfficeId !== null &&
      user.travelOfficeId !== travelOfficeId
    ) {
      throw new HttpException(
        `User with id ${userId} is already assigned to a travel office`,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.travelOfficeId = travelOfficeId;
    if (!travelOffice.users) {
      travelOffice.users = [];
    }

    travelOffice.users.push(user);
    await this.travelOfficeRepository.save(travelOffice);
  }

  async getTravelOfficeAccount(
    travelOfficeId: number,
    userId: number,
  ): Promise<TravelOfficeEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
      select: { travelOffice: { id: true } },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOfficeId) {
        throw new HttpException(
          `User with id ${userId} is not assigned to a travel office`,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (user.travelOfficeId !== travelOfficeId) {
        throw new UnauthorizedException('User Unauthorized');
      }
    }
    const travelOffice = await this.travelOfficeRepository.findOne({
      where: { id: travelOfficeId },
      relations: {
        account: true,
      },
      select: {
        name: true,
        id: true,
        profilePhoto: { imageUrl: true },
        email: true,
      },
    });
    if (!travelOffice) {
      throw new NotFoundException(
        `Travel office with id ${travelOfficeId} not found`,
      );
    }
    return travelOffice;
  }
}
