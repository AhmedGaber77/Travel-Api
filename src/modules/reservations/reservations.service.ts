import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ReservationEntity,
  ReservationStatus,
} from './entities/reservation.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ServiceEntity } from '../services/entities/service.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import {
  FilterReservationDto,
  QueryReservationDto,
  SortReservationDto,
} from './dto/query-reservation.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { TravelOfficeEntity } from '../travel-offices/entities/travel-office.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(
    userReq: UserEntity,
    createReservationDto: CreateReservationDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userReq.id },
      relations: {
        travelOffice: true,
      },
    });
    console.log('user: ', user);

    // TODO: Maybe remove this in the futere
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    if (user.travelOffice == null) {
      console.log(user.travelOffice);
      throw new UnauthorizedException(
        'User is not in a travel office and cannot make a reservation',
      );
    }

    const service = await this.serviceRepository.findOne({
      where: { id: createReservationDto.serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Service with ID ${createReservationDto.serviceId} not found`,
      );
    }

    if (createReservationDto.quantity > service.quantityAvailable) {
      throw new HttpException(
        `The quantity requested exceeds the quantity available`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const reservation = this.reservationRepository.create(createReservationDto);
    reservation.travelOffice = user.travelOffice;
    reservation.user = user;
    reservation.service = service;
    reservation.status = ReservationStatus.Pending;
    return await this.reservationRepository.save(reservation);
  }

  async findAll(userReq: UserEntity, query: QueryReservationDto) {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    if (
      userReq.role?.id === RoleEnum.admin ||
      userReq.role?.id === RoleEnum.wholesaler
    ) {
      return this.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      });
    }
    const user = await this.userRepository.findOne({
      where: { id: userReq.id },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }
    if (user.travelOffice == null) {
      throw new UnauthorizedException(
        'User is not in a travel office and cannot make a reservation',
      );
    }

    console.log(user.travelOffice);
    return this.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
      travelOffice: user.travelOffice,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    console.log(updateReservationDto);
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    travelOffice,
  }: {
    filterOptions?: FilterReservationDto | null;
    sortOptions?: SortReservationDto[] | null;
    paginationOptions: IPaginationOptions;
    travelOffice?: TravelOfficeEntity;
  }): Promise<ReservationEntity[]> {
    const where: FindOptionsWhere<ReservationEntity> = {};
    if (travelOffice) {
      where.travelOffice = travelOffice;
    }
    if (filterOptions?.status) {
      where.status = filterOptions?.status;
    }

    const entities = await this.reservationRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      relations: {
        travelOffice: true,
      },
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities;
  }
}
