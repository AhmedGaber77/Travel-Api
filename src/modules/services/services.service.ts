import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceEntity, ServiceType } from './entities/service.entity';
import { Repository } from 'typeorm';
import { WholesalersService } from '../wholesalers/wholesalers.service';
import { CreateHotelRoomServiceDto } from './dto/create-hotel-room.dto';
import { HotelsService } from '../hotels/hotels.service';
import { RoomEntity } from '../hotels/entities/room.entity';
import { CreateFlightServiceDto } from './dto/create-flight-service.dto';
import { FlightEntity } from '../flights/entities/flight.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
    private wholesalerService: WholesalersService,
    private readonly hotelsService: HotelsService,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const wholesaler = await this.wholesalerService.findOne(
      createServiceDto.WholesalerId,
    );
    if (!wholesaler) {
      throw new NotFoundException(
        `Wholesaler with id ${createServiceDto.WholesalerId} not found`,
      );
    }
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const existingService = await this.findOne(id);

    this.serviceRepository.merge(existingService, updateServiceDto);
    return this.serviceRepository.save(existingService);
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    await this.serviceRepository.softDelete(service.id);
    return true;
  }

  async createHotelRoomService(
    createHotelRoomServiceDto: CreateHotelRoomServiceDto,
  ) {
    const queryRunner =
      this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hotel = await this.hotelsService.findOne(
        createHotelRoomServiceDto.HotelId,
      );
      const service = await this.create(createHotelRoomServiceDto.service);
      service.type = ServiceType.HotelRooms;
      await queryRunner.manager.save(service);
      const hotelRoom = this.roomRepository.create({
        ...createHotelRoomServiceDto.room,
      });
      hotelRoom.service = service;
      hotelRoom.hotel = hotel;
      await this.roomRepository.save(hotelRoom);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Error creating hotel room service',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllHotelRoomServices() {
    const services = await this.serviceRepository.find({
      where: { type: 'hotel-rooms' },
      relations: ['room'],
    });
    return services;
  }

  async createFlightService(createFlightServiceDto: CreateFlightServiceDto) {
    const queryRunner =
      this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const service = await this.create(createFlightServiceDto.service);
      service.type = ServiceType.Flight;
      await queryRunner.manager.save(service);
      const flight = this.flightRepository.create({
        ...createFlightServiceDto.flight,
      });
      flight.service = service;
      await this.flightRepository.save(flight);
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error creating flight service');
    } finally {
      await queryRunner.release();
    }
  }

  async findAllFlightServices() {
    const services = await this.serviceRepository.find({
      where: { type: 'flight-seats' },
      relations: ['flight'],
    });
    return services;
  }
}
