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
import { CreateTransportationServiceDto } from './dto/create-transportation-service.dto';
import { TransportationEntity } from '../transportations/entities/transportation.entity';
import { CruiseEntity } from '../cruises/entities/cruise.entity';
import { SafariEntity } from '../safari/entities/safari.entity';
import { CreateCruiseServiceDto } from './dto/create-cruise-service.dto';
import { CreateSafariServiceDto } from './dto/create-safari-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(FlightEntity)
    private flightRepository: Repository<FlightEntity>,
    @InjectRepository(TransportationEntity)
    private transportationRepository: Repository<TransportationEntity>,
    @InjectRepository(SafariEntity)
    private safariRepository: Repository<SafariEntity>,
    @InjectRepository(CruiseEntity)
    private cruiseRepository: Repository<CruiseEntity>,
    private wholesalerService: WholesalersService,
    private readonly hotelsService: HotelsService,
  ) {}
  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
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

  async findOne(id: number): Promise<ServiceEntity> {
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
      // service.images = createHotelRoomServiceDto.service.images;
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
      where: { type: ServiceType.HotelRooms },
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
      service.type = ServiceType.FlightSeats;
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
      where: { type: ServiceType.FlightSeats },
      relations: ['flight'],
    });
    return services;
  }

  async createTransportationService(
    createTransportationServiceDto: CreateTransportationServiceDto,
  ) {
    const queryRunner =
      this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const service = await this.create(createTransportationServiceDto.service);
      service.type = ServiceType.Transportation;
      await queryRunner.manager.save(service);
      const transportation = this.transportationRepository.create({
        ...createTransportationServiceDto.transportation,
      });
      transportation.service = service;
      await this.transportationRepository.save(transportation);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Error creating transportation service',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAllTransportationServices() {
    const services = await this.serviceRepository.find({
      where: { type: ServiceType.Transportation },
      relations: ['transportation'],
    });
    return services;
  }

  async createSafariService(createSafariServiceDto: CreateSafariServiceDto) {
    const queryRunner =
      this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const service = await this.create(createSafariServiceDto.service);
      service.type = ServiceType.Safari;
      await queryRunner.manager.save(service);
      const safari = this.safariRepository.create({
        ...createSafariServiceDto.safari,
      });
      safari.service = service;
      await this.safariRepository.save(safari);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error creating safari service');
    } finally {
      await queryRunner.release();
    }
  }
  async findAllSafariServices() {
    const services = await this.serviceRepository.find({
      where: { type: ServiceType.Safari },
      relations: ['safari'],
    });
    return services;
  }

  async createCruiseService(createCruiseServiceDto: CreateCruiseServiceDto) {
    const queryRunner =
      this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const service = await this.create(createCruiseServiceDto.service);
      service.type = ServiceType.Cruise;
      await queryRunner.manager.save(service);
      const cruise = this.cruiseRepository.create({
        ...createCruiseServiceDto.cruise,
      });
      cruise.service = service;
      await this.cruiseRepository.save(cruise);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error creating cruise service');
    } finally {
      await queryRunner.release();
    }
  }

  async findAllCruiseServices() {
    const services = await this.serviceRepository.find({
      where: { type: ServiceType.Cruise },
      relations: ['cruise'],
    });
    return services;
  }
}
