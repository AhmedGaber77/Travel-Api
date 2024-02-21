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
import { TravelerEntity } from './entities/traveler.entity';
import { UpdateTravelerDto } from './dto/update-traveler.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';
import { UpdateReservationStatusDto } from './dto/update-status.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TravelerEntity)
    private travelerRepository: Repository<TravelerEntity>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async createReservationNew(
    userId: UserEntity['id'],
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }
    if (!user.travelOffice) {
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
    console.log('userrrrrrrr', user);
    if (!user.travelOffice) {
      throw new UnauthorizedException(
        'User is not in a travel office and cannot make a reservation',
      );
    }
    const reservation = this.reservationRepository.create(createReservationDto);
    reservation.travelOffice = user.travelOffice;
    reservation.user = user;
    reservation.service = service;
    reservation.status = ReservationStatus.Pending;
    return await this.reservationRepository.save(reservation);
  }

  async createReservation(
    userId: UserEntity['id'],
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    // console.log('user: ', user);

    // TODO: Maybe remove this in the futere
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    if (user.travelOffice == null) {
      // console.log(user.travelOffice);
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

  async findAllReservations(
    userId: UserEntity['id'],
    query: QueryReservationDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    if (
      user.role?.id === RoleEnum.admin ||
      user.role?.id === RoleEnum.wholesaler
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

    if (user.travelOffice == null) {
      throw new UnauthorizedException(
        'User is not in a travel office and cannot make a reservation',
      );
    }
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

  async findOneReservation(userId: UserEntity['id'], id: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    const reservation = await this.reservationRepository.findOne({
      where: { id, travelOffice: { id: user.travelOffice?.id } },
      relations: {
        travelOffice: true,
        user: true,
        service: {
          flight: true,
          room: true,
          transportation: true,
          cruise: true,
          safari: true,
          standardPackage: true,
        },
        travelers: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async updateReservation(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    this.reservationRepository.merge(reservation, updateReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async softDeleteReservation(id: number) {
    const reservation = this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    await this.reservationRepository.softDelete(id);
  }

  async updateStatus(
    id: number,
    updateReservationStatusDto: UpdateReservationStatusDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    reservation.status = updateReservationStatusDto.status;
    return this.reservationRepository.save(reservation);
  }

  async findAllTravelers(userId: UserEntity['id'], reservationId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId, travelOffice: { id: user.travelOffice?.id } },
      relations: {
        travelers: true,
      },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`,
      );
    }
    return reservation.travelers;
  }

  async updateTraveler(
    reservationId: number,
    travelerId: number,
    updateTravelerDto: UpdateTravelerDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: {
        travelers: true,
      },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`,
      );
    }
    const traveler = await this.travelerRepository.findOne({
      where: { id: travelerId },
    });
    if (!traveler) {
      throw new NotFoundException(`Traveler with ID ${travelerId} not found`);
    }
    this.travelerRepository.merge(traveler, updateTravelerDto);
    return this.travelerRepository.save(traveler);
  }

  async removeTraveler(reservationId: number, travelerId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: {
        travelers: true,
      },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`,
      );
    }
    const traveler = reservation.travelers.find(
      (traveler) => traveler.id === travelerId,
    );
    if (!traveler) {
      throw new NotFoundException(
        `Traveler with ID ${travelerId} not found in reservation`,
      );
    }
    await this.travelerRepository.remove(traveler);
  }

  async createTraveler(
    reservationId: number,
    createTravelerDto: CreateTravelerDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`,
      );
    }
    const traveler = this.travelerRepository.create(createTravelerDto);
    traveler.reservation = reservation;
    return this.travelerRepository.save(traveler);
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
      where.travelOfficeId = travelOffice.id;
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
        service: {
          flight: true,
          room: true,
          transportation: true,
          cruise: true,
          safari: true,
          standardPackage: true,
        },
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

  async searchReservationByTravelOffice(searchQuery: string) {
    return await this.reservationRepository.find({
      relations: {
        travelOffice: true,
      },
      where: {
        travelOffice: {
          name: searchQuery,
        },
      },
    });
  }
}
