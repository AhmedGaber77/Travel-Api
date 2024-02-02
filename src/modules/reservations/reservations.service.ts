import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ReservationEntity,
  ReservationStatus,
} from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ServicesService } from '../services/services.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    private servicesService: ServicesService,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const service = await this.servicesService.findOne(
      createReservationDto.serviceId,
    );
    if (createReservationDto.quantity > service.quantityAvailable) {
      throw new HttpException(
        `The quantity requested exceeds the quantity available`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const reservation = this.reservationRepository.create(createReservationDto);
    reservation.service = service;
    reservation.status = ReservationStatus.Pending;
    return await this.reservationRepository.save(reservation);
  }

  findAll() {
    return this.reservationRepository.find({
      loadRelationIds: true,
      order: {
        createdAt: 'DESC',
      },
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
}
