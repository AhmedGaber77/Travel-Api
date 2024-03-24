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
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionType } from '../accounts/entities/transaction.entity';

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
    private accountsService: AccountsService,
    // private genericSeacrch: GenericSearch<ReservationEntity>,
  ) {}

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

    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    if (user.travelOffice == null) {
      throw new UnauthorizedException(
        'User is not in a travel office and cannot make a reservation',
      );
    }

    const service = await this.serviceRepository.findOne({
      where: { id: createReservationDto.serviceId },
      select: {
        id: true,
        quantityAvailable: true,
      },
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
  ): Promise<InfinityPaginationResultType<ReservationEntity>> {
    console.log(userId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
      select: {
        id: true,
        travelOffice: { id: true },
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

    return infinityPagination(
      await this.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
        travelOffice: user.travelOffice,
      }),
      { page, limit },
    );
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

    console.log(user.travelOffice?.id);
    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = id;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }
    const reservation = await this.reservationRepository.findOne({
      where: where,
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
    userId: UserEntity['id'],
    id: number,
    updateReservationDto: UpdateReservationDto,
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

    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = id;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }
    const reservation = await this.reservationRepository.findOne({
      where: where,
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    this.reservationRepository.merge(reservation, updateReservationDto);
    return await this.reservationRepository.save(reservation);
  }

  async softDeleteReservation(userId: UserEntity['id'], id: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        travelOffice: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User Unauthorized');
    }

    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = id;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }
    const reservation = this.reservationRepository.findOne({
      where: where,
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
    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = reservationId;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }
    const reservation = await this.reservationRepository.findOne({
      where: where,
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
    userId: UserEntity['id'],
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

  async removeTraveler(
    userId: UserEntity['id'],
    reservationId: number,
    travelerId: number,
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

    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = reservationId;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }

    const reservation = await this.reservationRepository.findOne({
      where: where,
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
    userId: UserEntity['id'],
    reservationId: number,
    createTravelerDto: CreateTravelerDto,
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

    const where: FindOptionsWhere<ReservationEntity> = {};
    where.id = reservationId;
    if (user.role?.id === RoleEnum.travelAgent) {
      if (!user.travelOffice) {
        throw new UnauthorizedException('User Not in a travel office');
      }
      where.travelOfficeId = user.travelOffice.id;
    }

    const reservation = await this.reservationRepository.findOne({
      where: where,
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

  async cancelReservation(
    id: number,
    CancelReservationDto: CancelReservationDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { id, status: ReservationStatus.Pending },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    reservation.status = ReservationStatus.Canceled;
    reservation.CancelReason = CancelReservationDto.cancelReason;
    return this.reservationRepository.save(reservation);
  }

  async confirmReservation(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: {
        service: true,
        travelOffice: {
          account: true,
        },
      },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    console.log(reservation.travelOffice);
    await this.accountsService.createAccountTransaction(
      reservation.travelOffice.account.id,
      {
        amount: reservation.service.price * reservation.quantity,
        type: TransactionType.Withdraw,
        transactionDate: new Date(),
        transactionTime: new Date(),
        currency: 'USD',
        reservation: reservation,
      },
    );
    reservation.status = ReservationStatus.Confirmed;
    return this.reservationRepository.save(reservation);
  }

  // async searchReservationByTravelOffice(searchQuery: string) {
  //   return await this.reservationRepository.find({
  //     relations: {
  //       travelOffice: true,
  //     },
  //     where: {
  //       travelOffice: {
  //         name: searchQuery,
  //       },
  //     },
  //   });
  // }
}
