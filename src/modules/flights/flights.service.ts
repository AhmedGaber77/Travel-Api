import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ServicesService } from '../services/services.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FlightEntity } from './entities/flight.entity';
import { Repository } from 'typeorm';
import { SeatEntity } from './entities/seat.entity';
import { ServiceType } from '../services/entities/service.entity';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class FlightsService {
  constructor(
    private readonly servicesService: ServicesService,
    @InjectRepository(FlightEntity)
    private readonly flightRepository: Repository<FlightEntity>,
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
  ) {}
  async create(createFlightDto: CreateFlightDto) {
    const service = await this.servicesService.findOne(
      createFlightDto.ServiceId,
    );
    if (!service) {
      throw new NotFoundException(
        `Service with id ${createFlightDto.ServiceId} not found`,
      );
    }

    if (service.type !== ServiceType.Flight) {
      throw new BadRequestException(
        `Service with id ${createFlightDto.ServiceId} is not a flight`,
      );
    }

    // TODO: check if departureCityId and arrivalCityId exist in the database

    const flight = this.flightRepository.create(createFlightDto);
    if (createFlightDto.seats) {
      console.log('createFlightDto.seats', createFlightDto.seats);
      const seats = this.seatRepository.create(createFlightDto.seats);
      flight.seats = seats;
      console.log('flight.seats', flight.seats);
    }

    return this.flightRepository.save(flight);
  }

  findAll() {
    return `This action returns all flights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flight`;
  }

  update(id: number, updateFlightDto: UpdateFlightDto) {
    console.log('updateFlightDto', updateFlightDto);
    return `This action updates a #${id} flight`;
  }

  remove(id: number) {
    return `This action removes a #${id} flight`;
  }

  async createSeats(flightId: number, seats: CreateSeatDto[]) {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
    });
    if (!flight) {
      throw new NotFoundException(`Flight with id ${flightId} not found`);
    }
    const newSeats = this.seatRepository.create(seats);
    console.log('newSeats', newSeats);
    flight.seats = newSeats;
    await this.seatRepository.save(newSeats);
    return this.flightRepository.save(flight);
  }
}
